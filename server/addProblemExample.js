// Example script to add a problem to your database
// Run with: node addProblemExample.js

import axios from "axios";

const API_BASE_URL = "http://localhost:6001";

// Example: Two Sum Problem
const problemData = {
  id: "two-sum",
  title: "Two Sum",
  difficult: "Easy",
  category: "Array",
  order: 1,
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
  testcases: [
    {
      input: "[2,7,11,15]\n9",
      output: "[0,1]"
    },
    {
      input: "[3,2,4]\n6",
      output: "[1,2]"
    },
    {
      input: "[3,3]\n6",
      output: "[0,1]"
    }
  ]
};

async function addProblem() {
  try {
    console.log("🚀 Adding problem to database...\n");

    // Step 1: Add to problems table (for list view)
    console.log("Step 1: Adding to problems table...");
    const tableResponse = await axios.post(
      `${API_BASE_URL}/problemsTable`,
      {
        id: problemData.id,
        title: problemData.title,
        difficult: problemData.difficult,
        category: problemData.category,
        order: problemData.order,
      }
    );
    console.log("✅ Successfully added to problems table!");
    console.log("   Response:", tableResponse.data.message, "\n");

    // Step 2: Add full problem details
    console.log("Step 2: Adding problem details...");
    const detailsResponse = await axios.post(
      `${API_BASE_URL}/problem`,
      problemData
    );
    console.log("✅ Successfully added problem details!");
    console.log("   Response:", detailsResponse.data.message, "\n");

    console.log("🎉 Problem added successfully!");
    console.log(`   You can now view it at: http://localhost:3000/problem/${problemData.id}`);

  } catch (error) {
    if (error.response) {
      console.error("❌ Error:", error.response.data.message || error.response.data);
      if (error.response.status === 409) {
        console.error("   This problem already exists in the database.");
      }
    } else {
      console.error("❌ Error:", error.message);
      console.error("   Make sure your server is running on port 6001");
    }
  }
}

// Run the function
addProblem();


