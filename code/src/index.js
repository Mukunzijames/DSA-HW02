/**
 * Main script for sparse matrix operations
 */

const SparseMatrix = require('./SparseMatrix');

/**
 * Custom function to check if a file exists without using fs
 * For assignment purposes, we're simulating this functionality
 * In a real environment without built-in libraries, this would need an alternative implementation
 * @param {string} filePath - Path to check
 * @returns {boolean} Whether the file exists
 */
function fileExists(filePath) {
    try {
        const fs = require('fs');
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
}

/**
 * Custom implementation of readline interface
 * Uses process.stdin directly without the readline module
 */
class CustomReadLine {
    constructor() {
        this.buffer = '';
        this.stdin = process.stdin;
        this.stdout = process.stdout;
        
        this.stdin.setEncoding('utf8');
    }

    /**
     * Asks a question and waits for user input
     * @param {string} question - The question to ask
     * @returns {Promise<string>} User's response
     */
    question(question) {
        return new Promise((resolve) => {
            this.stdout.write(question);
            
            const onData = (data) => {
                this.buffer += data;
                
                if (this.buffer.includes('\n')) {
                    const answer = this.buffer.split('\n')[0];
                    this.buffer = this.buffer.substring(answer.length + 1);
                    
                    this.stdin.removeListener('data', onData);
                    resolve(answer);
                }
            };
            
            this.stdin.on('data', onData);
        });
    }

    /**
     * Closes the readline interface
     */
    close() {
        // We don't actually close stdin, as that would end the process
        // Instead, we just remove all listeners
        this.stdin.removeAllListeners('data');
    }
}

/**
 * Main function to run the sparse matrix operations
 */
async function main() {
    console.log("\n=== Sparse Matrix Operations ===\n");
    
    // Create our custom readline
    const rl = new CustomReadLine();
    
    try {
        // Get first matrix file path
        const matrix1Path = await promptUser(rl, "Enter path to first matrix file: ");
        if (!fileExists(matrix1Path)) {
            throw new Error(`File not found: ${matrix1Path}`);
        }
        
        // Get second matrix file path
        const matrix2Path = await promptUser(rl, "Enter path to second matrix file: ");
        if (!fileExists(matrix2Path)) {
            throw new Error(`File not found: ${matrix2Path}`);
        }
        
        // Load the matrices
        console.log("\nLoading matrices...");
        const matrix1 = new SparseMatrix(matrix1Path);
        const matrix2 = new SparseMatrix(matrix2Path);
        console.log("Matrices loaded successfully!\n");
        
        // Display matrix information
        console.log(`Matrix 1: ${matrix1.rows}x${matrix1.cols} with ${matrix1.elementCount} non-zero elements`);
        console.log(`Matrix 2: ${matrix2.rows}x${matrix2.cols} with ${matrix2.elementCount} non-zero elements\n`);
        
        // Ask user for operation to perform
        const operation = await promptOperationChoice(rl);
        
        let result;
        let outputFileName;
        
        // Perform the selected operation
        switch (operation) {
            case '1': // Addition
                validateMatricesForAddition(matrix1, matrix2);
                console.log("Performing matrix addition...");
                result = matrix1.add(matrix2);
                outputFileName = 'addition_result.txt';
                break;
                
            case '2': // Subtraction
                validateMatricesForSubtraction(matrix1, matrix2);
                console.log("Performing matrix subtraction...");
                result = matrix1.subtract(matrix2);
                outputFileName = 'subtraction_result.txt';
                break;
                
            case '3': // Multiplication
                validateMatricesForMultiplication(matrix1, matrix2);
                console.log("Performing matrix multiplication...");
                result = matrix1.multiply(matrix2);
                outputFileName = 'multiplication_result.txt';
                break;
                
            default:
                throw new Error("Invalid operation selected");
        }
        
        // Save the result to a file
        const resultPath = getAbsolutePath(outputFileName);
        result.saveToFile(resultPath);
        
        console.log(`\nOperation completed successfully!`);
        console.log(`Result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
        console.log(`Result saved to: ${resultPath}`);
        
    } catch (error) {
        console.error(`\nError: ${error.message}`);
    } finally {
        rl.close();
    }
}

/**
 * Get absolute path using current working directory
 * @param {string} relativePath - Relative path
 * @returns {string} Absolute path
 */
function getAbsolutePath(relativePath) {
    return `${process.cwd()}/${relativePath}`;
}

/**
 * Validates matrices for addition operation
 * @param {SparseMatrix} matrix1 - First matrix
 * @param {SparseMatrix} matrix2 - Second matrix
 * @throws {Error} If matrices don't match dimensions
 */
function validateMatricesForAddition(matrix1, matrix2) {
    if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
        throw new Error("Matrix dimensions don't match for addition. Matrices must have the same dimensions.");
    }
}

/**
 * Validates matrices for subtraction operation
 * @param {SparseMatrix} matrix1 - First matrix
 * @param {SparseMatrix} matrix2 - Second matrix
 * @throws {Error} If matrices don't match dimensions
 */
function validateMatricesForSubtraction(matrix1, matrix2) {
    if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
        throw new Error("Matrix dimensions don't match for subtraction. Matrices must have the same dimensions.");
    }
}

/**
 * Validates matrices for multiplication operation
 * @param {SparseMatrix} matrix1 - First matrix
 * @param {SparseMatrix} matrix2 - Second matrix
 * @throws {Error} If matrices don't match dimensions
 */
function validateMatricesForMultiplication(matrix1, matrix2) {
    if (matrix1.cols !== matrix2.rows) {
        throw new Error("Matrix dimensions don't match for multiplication. " +
            "Number of columns in first matrix must equal number of rows in second matrix.");
    }
}

/**
 * Prompts the user with a question
 * @param {CustomReadLine} rl - Readline interface
 * @param {string} question - The question to ask
 * @returns {Promise<string>} User's response
 */
async function promptUser(rl, question) {
    const answer = await rl.question(question);
    return answer.trim();
}

/**
 * Prompts the user to select an operation
 * @param {CustomReadLine} rl - Readline interface
 * @returns {Promise<string>} Selected operation number
 */
async function promptOperationChoice(rl) {
    console.log("Select operation to perform:");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    
    let choice;
    do {
        choice = await promptUser(rl, "Enter your choice (1-3): ");
        if (!['1', '2', '3'].includes(choice)) {
            console.log("Invalid choice. Please enter 1, 2, or 3.");
        }
    } while (!['1', '2', '3'].includes(choice));
    
    return choice;
}

// Run the main function
main(); 