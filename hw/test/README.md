Homework description
Assignment 2 (A2): Visualization Design
Part 1 Demonstrations and QA
Choose one of the two demonstrations given under Files -> Demonstrations -> gapminder_demonstrations.zip (scatter plot or bar chart). Only a .js file is provided for each demonstration, and each file uses the gapminder.csv dataset that is under Files -> Datasets. Throughout the two JavaScript files, you'll find a series of conceptual questions that ask you to explain what is happening in the code. 

(1) Work through the questions inside your chosen demonstration, and record your answers directly in the file in the commented sections. 

(2) Create an html file and load the appropriate datasets, stylesheets, and scripts to create the expected visualization. Submit a complete copy of your code (zip folder) and a screenshot of your resulting chart to Canvas.

(3) Open the opposite demonstration's js file (e.g., if you studied the scatter plot, find the bar chart and vice versa). Without implementing the visualization, study its various parts and pay attention to what is similar and what is different between the two. In particular:

(a) What kinds of scale functions are used in both demonstrations? Why are those scale functions being used?
(b) What is similar and different about the data join pattern used in both demonstrations?
(c) Compare the ways the data are filtered in both demonstrations. How are these different?
(d) If you wanted to convert the bar chart to the scatter plot or vice versa, what changes would you need to make to the code to make that conversion? 

Record your answers in a separate document (e.g., a PDF file) and upload the document to Canvas.
Part 2 Digital Visualization
Create a digital visualization for the same small dataset from A1 and provide rigorous rationale for your design choices. In theory, you should be in a position to explain how every pixel contributes to your visualization. You are free to use any graphical tool you are comfortable with, including Tableau, Adobe Illustrator, PowerPoint, Autodesk Sketchbook, Microsoft Excel, Paint. You could also create a chart from scratch using a visualization package of your choice. For example, some useful packages are:

D3 Links to an external site.– A JavaScript library for data-driven DOM manipulation, interaction and animation. Includes utilities for visualization techniques and SVG generation.
Processing Links to an external site.or p5.js Links to an external site.– A popular Java-like graphics and interaction language and IDE. Processing has a strong user community with many examples. p5.js is a sister project for JavaScript.
Lyra Links to an external site.– an interactive visualization design environment
Small-Size Dataset: US Population, 1900 vs 2000
For this assignment you will use the same dataset as in A1 which contains a high-level summary of census data for two years a century apart: 1900 and 2000. The data is a CSV (comma-separated values) file that describes the US population in terms of year, reported sex (1: male, 2: female), age group (binned into 5 year segments from 0-4 years old up to 90+ years old), and the total count of people per group. This is the same dataset from A1 but this time the CSV file contains the raw data directly with exact, precise population counts for each age group and year. Your submission should reflect these accurate values rather than the rounded values from A1. 

Dataset: Look under Files -> Datasets -> "USPopulation-NewDataset-ARTG5430.csv"

Your Tasks
Start by choosing a question you’d like your visualization to answer. This question could be the same as in your A1 assignment, or you can explore a new question.
Design a static visualization (i.e., a single image) that you believe effectively tackle that question, and use the question as the title of your graphic. It is recommended that you iterate over your ideas from A1, but you may also draw on inspiration from other sources. 
Provide a short writeup (approximately 2-3 paragraphs) describing your process and design decisions, and in what ways your work in A1 informed your visual design in this assignment. For example, you could discuss to what extend sketching helped inform your design (e.g., did you keep or discard any aspects of your sketches? Or did your work in A1 help you change course for A2?).  
While you must use the data set provided, you are free to transform the data as necessary. Examples of transforms include log transformations, computing percentages or averages, grouping elements into new categories, or removing unnecessary variables or records. You are also free to incorporate external data as you see fit. Your chart image should be interpretable without consulting your writeup. It should include a title, axis labels or legends as needed.

Document the visual encodings you used and why they are appropriate for the data and your specific question. These decisions include the choice of visualization (mark) type, size, color, scale, and other visual elements, as well as the use of sorting or other data transformations.