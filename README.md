# CSV-Pipe: Easy Data-to-CSV Conversion

CSV-Pipe is a versatile TypeScript/JavaScript library that effortlessly converts data into the CSV file format for both front-end and back-end applications. It is lightweight and designed for simplicity, enabling the seamless transformation of arrays of objects into CSV format.

## Installation

```
npm install --save csv-pipe
```

## Usage Guide

This section is dedicated to helping you integrate CSV-Pipe into your project with ease. Below, you'll find step-by-step instructions and code snippets that demonstrate how to convert your data into CSV format using our library.

#### Front-end

```typescript
import { CsvPipe, cpDownload } from 'csv-pipe';

// Instantiate CsvPipe with configuration options
const csvPipe = new CsvPipe({
  filename: 'active_users_october', // Optional: Specify file name
  headers: ['Name', 'Age', 'Email'] // Optional: Specify CSV column headers
});

const data: CpDataset = [
  {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    age: 29
  },
  {
    name: 'Carlos Herrera',
    email: 'carlos.h24@example.com',
    age: 24
  }
];

// Convert your Array to CSV format
const result = csvPipe.generate(data);

// Download the resulting data as a CSV or TXT file. If you require the output in TXT format, specify 'txt' as the second parameter
cpDownload(result);
```

#### Back-end

```typescript
import { CsvPipe } from 'csv-pipe';
import { writeFile } from 'fs';

// Instantiate CsvPipe with configuration options
const csvPipe = new CsvPipe({
  filename: 'active_users_october', // Optional: Specify file name
  headers: ['Name', 'Age', 'Email'] // Optional: Specify CSV column headers
});

const data = [
  {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    age: 29
  },
  {
    name: 'Carlos Herrera',
    email: 'carlos.h24@example.com',
    age: 24
  }
];

// Convert your Array to CSV format
const result = csvPipe.generate(data);

// Write the csv file
writeFile(`${result.filename}.csv`, result.data, (error) => {
  if (error) throw new Error(error);

  console.log(`${result.filename} successfully saved!`);
});
```

#### Config Table

| Option         | Description                                              | Default Value                      | Accepted Value                    |
| -------------- | -------------------------------------------------------- | ---------------------------------- | --------------------------------- |
| `separator`    | Character for field separation, typically a comma        | `,`                                | `string`                          |
| `filename`     | The name assigned to the CSV file                        | Generated Randomly                 | `string`                          |
| `headers`      | List of strings for CSV column headers                   | `[]`                               | `Array<string>`                   |
| `quote`        | Character to wrap around values                          | `"`                                | `string`                          |
| `autoHeaders`  | Whether to generate headers from data keys automatically | `false`                            | `boolean`                         |
| `showHeaders`  | Whether to include headers in the CSV output             | `true`                             | `boolean`                         |
| `infinityText` | Representation for Infinity values in CSV                | `"Infinity"`                       | `string`                          |
| `nullDisplay`  | Text representation for null values                      | `"null"`                           | `string`                          |
| `undefDisplay` | Text for undefined values                                | `"undefined"`                      | `string`                          |
| `boolStyle`    | Text mappings for true and false values                  | `{ true: "TRUE", false: "FALSE" }` | `{ true: string, false: string }` |
| `charset`      | Encoding for the CSV file                                | `"utf8"`                           | `string`                          |
| `newLine`      | Characters used for line breaks in CSV                   | `"\r\n"`                           | `string`                          |
| `NaNText`      | Text to represent NaN values                             | `""`                               | `string`                          |

## Getting Help

If you have questions or encounter any issues, please open an issue on our [GitHub repository](https://github.com/myroslavmartsin/csv-pipe) so we can help you out.

## Thank you for choosing CSV-Pipe

We trust it will enhance your data handling capabilities and simplify your CSV conversion tasks.
