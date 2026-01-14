// const ProblemDetails = {
//   id: "two-sum",
//   title: "Two Sum",
//   difficult: "Hard",
//   category: "Array",
//   order: "1",
//   description:
//     "Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.You may assume the array is the output of JSON.parse.",
//   examples: [
//     {
//       input: "nums = [null, {}, 30]",
//       output: "3",
//       explanation: "Kuch bhi de do abhi toh baad me dekh lege",
//     },
//     {
//       input: "nums = []",
//       output: "-1",
//       explanation: " ek aur Kuch bhi de do abhi toh baad me dekh lege",
//     },
//   ],
//   constraints: ["0 <= arr.length <= 1000", "1000 <= arr.length <= 5000"],
// };

// export default ProblemDetails;



const ProblemsList = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: "1",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 9",
      },
    ],
    constraints: ["2 <= nums.length <= 10⁴"],
    testcases: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
      },
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
      },
    ],
  },

  {
    id: "array-last-element",
    title: "Array Last Element",
    difficulty: "Easy",
    category: "Array",
    order: "2",
    description:
      "Enhance all arrays such that you can call array.last() which returns the last element or -1 if empty.",
    examples: [
      {
        input: "arr = [null, {}, 30]",
        output: "30",
        explanation: "Last element is 30",
      },
      {
        input: "arr = []",
        output: "-1",
        explanation: "Array is empty",
      },
    ],
    constraints: ["0 <= arr.length <= 1000"],
    testcases: [
      {
        input: "3\nnull {} 30",
        output: "30",
      },
      {
        input: "0",
        output: "-1",
      },
    ],
  },

  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    order: "3",
    description: "Write a function that reverses a string.",
    examples: [
      {
        input: "s = 'hello'",
        output: "'olleh'",
      },
    ],
    constraints: ["1 <= s.length <= 10⁵"],
    testcases: [
      {
        input: "hello",
        output: "olleh",
      },
    ],
  },

  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Medium",
    category: "String",
    order: "4",
    description:
      "Check if a string is a palindrome after converting to lowercase and removing non-alphanumeric characters.",
    examples: [
      {
        input: "s = 'A man, a plan, a canal: Panama'",
        output: "true",
      },
    ],
    constraints: ["1 <= s.length <= 2 * 10⁵"],
    testcases: [
      {
        input: "A man, a plan, a canal: Panama",
        output: "true",
      },
      {
        input: "race a car",
        output: "false",
      },
    ],
  },

  {
    id: "max-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array",
    order: "5",
    description:
      "Find the contiguous subarray which has the largest sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
    ],
    constraints: ["1 <= nums.length <= 10⁵"],
    testcases: [
      {
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        output: "6",
      },
    ],
  },
];

export default ProblemsList;
