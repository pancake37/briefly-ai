/**
 * Briefly AI — Secure Serverless Rate-Limited Proxy
 * 
 * Place this code in a Cloudflare Worker to securely hide your OpenRouter API key
 * and offer a free daily trial (e.g. 50 requests/day) to your website visitors!
 */

// 1. Paste your OpenRouter API key here
// Alternatively, set the environment variable OPENROUTER_API_KEY in Cloudflare Settings
const OPENROUTER_API_KEY = "YOUR_OPENROUTER_API_KEY"; 

// 2. Set the maximum number of requests allowed for all users per day
const DAILY_LIMIT = 50;

// Simple in-memory tracker for rate limiting (lasts as long as the worker instance stays warm).
let requestCounts = {};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests from Briefly AI (GitHub Pages)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      });
    }

    if (request.method !== "POST") {
      return new Response("Only POST requests are allowed", { status: 405 });
    }

    try {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Reset rate limit count on a new day
      if (!requestCounts[today]) {
        requestCounts = { [today]: 0 }; 
      }

      // Check if daily global trial limit has been reached
      if (requestCounts[today] >= DAILY_LIMIT) {
        return new Response(JSON.stringify({
          error: {
            message: `Free trial limit reached for today! Please open settings and enter your own OpenRouter API key to continue.`
          }
        }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }

      // Increment today's count
      requestCounts[today]++;

      const body = await request.json();
      const apiKey = env.OPENROUTER_API_KEY || OPENROUTER_API_KEY;

      if (!apiKey || apiKey === "YOUR_OPENROUTER_API_KEY") {
        return new Response(JSON.stringify({
          error: {
            message: "Proxy Configuration Error: Developer has not set the OPENROUTER_API_KEY."
          }
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }

      // Forward request to OpenRouter securely
      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://pancake37.github.io/briefly-ai/",
          "X-Title": "Briefly AI Proxy"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: body.messages,
          temperature: body.temperature || 0.3
        })
      });

      const responseData = await openRouterResponse.text();
      
      return new Response(responseData, {
        status: openRouterResponse.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({
        error: { message: `Proxy Error: ${err.message}` }
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};
