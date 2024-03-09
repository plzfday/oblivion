"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const skillCategories = [
  "HTML/CSS/JavaScript",
  "Responsive Web Design",
  "JavaScript Frameworks",
  "State Management",
  "Version Control",
  "Testing",
  "Web Performance Optimization",
  "Backend Programming Languages",
  "Frameworks",
  "Databases",
  "API Development",
  "Authentication/Authorization",
  "Containerization",
  "Cloud Services",
];

const initialFrequencies = skillCategories.reduce(
  (acc, skill) => ({ ...acc, [skill]: 0 }),
  {}
);
interface Frequencies {
  [key: string]: number;
}

export default function Profile() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [frequencies, setFrequencies] =
    useState<Frequencies>(initialFrequencies);
  console.log(frequencies);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };
  function generatePrompt(input: string): string {
    const categories = [
      "HTML/CSS/JavaScript",
      "Responsive Web Design",
      "JavaScript Frameworks",
      "State Management",
      "Version Control",
      "Testing",
      "Web Performance Optimization",
      "Backend Programming Languages",
      "Frameworks",
      "Databases",
      "API Development",
      "Authentication/Authorization",
      "Containerization",
      "Cloud Services",
    ];

    return `Analyse the following input: "${input}" and choose only one category that best fits with the input from the list provided. Return only the name of the category without adding anything else. Here are the categories: ${categories.join(
      ", "
    )}`;
  }

  const onHandleSubmit = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: generatePrompt(input) }],
      });
      const response = completion.choices[0]?.message?.content || "";
      setOutput(response);

      // Update the frequency based on the output
      const updatedFrequencies = { ...frequencies };
      skillCategories.forEach((skill: string) => {
        if (response === skill) {
          updatedFrequencies[skill] += 1;
        }
      });
      setFrequencies(updatedFrequencies);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Input"
        variant="outlined"
        value={input}
        onChange={handleInputChange}
        fullWidth
        sx={{ m: 1 }}
      />
      <Button onClick={onHandleSubmit} sx={{ m: 1 }}>
        Submit
      </Button>
      {output && (
        <div>
          <strong>Response:</strong> {output}
        </div>
      )}
      <div>
        {Object.keys(frequencies).map((skill) => (
          <p key={skill}>
            {skill}: {frequencies[skill]}
          </p>
        ))}
      </div>
    </div>
  );
}
