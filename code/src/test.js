/**
 * Test script for the sparse matrix implementation
 */

const SparseMatrix = require('./SparseMatrix');

/**
 * Custom function to join paths without using path module
 * @param {string[]} paths - Paths to join
 * @returns {string} Joined path
 */
function joinPaths(...paths) {
    return paths.join('/').replace(/\/+/g, '/');
}

/**
 * Get the directory name of the current file
 * @returns {string} Directory name
 */
function getDirName() {
    // Get the current working directory up to the project root
    return process.cwd().split('/code')[0];
}

/**
 * Custom function to check if a file exists
 * For assignment purposes, we're simulating this functionality
 * @param {string} filePath - Path to check
 * @returns {boolean} Whether the file exists
 */
function fileExists(filePath) {
    try {
        // For testing purposes only
        const fs = require('fs');
        return fs.existsSync(filePath);
    } catch (error) {
        return false;
    }
}

/**
 * Main test function
 */
function runTests() {
    try {
        console.log('\n=== Sparse Matrix Tests ===\n');
        
        // Paths to sample matrix files
        const basePath = joinPaths(getDirName(), 'sample_inputs');
        const matrix1Path = joinPaths(basePath, 'matrixfile1.txt');
        const matrix2Path = joinPaths(basePath, 'matrixfile3.txt');
        
        console.log(`Matrix 1 path: ${matrix1Path}`);
        console.log(`Matrix 2 path: ${matrix2Path}`);
        
        // Check if files exist
        if (!fileExists(matrix1Path)) {
            console.error(`Matrix file not found: ${matrix1Path}`);
            return;
        }
        
        if (!fileExists(matrix2Path)) {
            console.error(`Matrix file not found: ${matrix2Path}`);
            return;
        }
        
        // Load matrices
        console.log('Loading matrices...');
        const matrix1 = new SparseMatrix(matrix1Path);
        const matrix2 = new SparseMatrix(matrix2Path);
        
        console.log(`Matrix 1: ${matrix1.rows}x${matrix1.cols} with ${matrix1.elementCount} non-zero elements`);
        console.log(`Matrix 2: ${matrix2.rows}x${matrix2.cols} with ${matrix2.elementCount} non-zero elements\n`);
        
        // Test if matrices can be multiplied
        const canMultiply = matrix1.cols === matrix2.rows;
        const canAddSubtract = matrix1.rows === matrix2.rows && matrix1.cols === matrix2.cols;
        
        // Test matrix addition if dimensions match
        if (canAddSubtract) {
            console.log('=== Matrix Addition ===');
            console.log('Matrix 1 + Matrix 2:');
            const additionResult = matrix1.add(matrix2);
            
            console.log(`Result: ${additionResult.rows}x${additionResult.cols} with ${additionResult.elementCount} non-zero elements`);
            saveSampleResult(additionResult, 'addition_result.txt');
            console.log('Addition result saved to addition_result.txt\n');
        } else {
            console.log('Cannot perform addition: Matrix dimensions do not match\n');
        }
        
        // Test matrix subtraction if dimensions match
        if (canAddSubtract) {
            console.log('=== Matrix Subtraction ===');
            console.log('Matrix 1 - Matrix 2:');
            const subtractionResult = matrix1.subtract(matrix2);
            
            console.log(`Result: ${subtractionResult.rows}x${subtractionResult.cols} with ${subtractionResult.elementCount} non-zero elements`);
            saveSampleResult(subtractionResult, 'subtraction_result.txt');
            console.log('Subtraction result saved to subtraction_result.txt\n');
        } else {
            console.log('Cannot perform subtraction: Matrix dimensions do not match\n');
        }
        
        // Test matrix multiplication if dimensions allow
        if (canMultiply) {
            console.log('=== Matrix Multiplication ===');
            console.log('Matrix 1 * Matrix 2:');
            
            const multiplicationResult = matrix1.multiply(matrix2);
            
            console.log(`Result: ${multiplicationResult.rows}x${multiplicationResult.cols} with ${multiplicationResult.elementCount} non-zero elements`);
            saveSampleResult(multiplicationResult, 'multiplication_result.txt');
            console.log('Multiplication result saved to multiplication_result.txt\n');
        } else {
            console.log('Cannot perform multiplication: Matrix dimensions do not match\n');
        }
        
        console.log('Tests completed.');
    } catch (error) {
        console.error(`\nTest Error: ${error.message}`);
    }
}

/**
 * Save a sample result to a file
 * @param {SparseMatrix} matrix - Matrix to save
 * @param {string} filename - Name of the file
 */
function saveSampleResult(matrix, filename) {
    const outputPath = joinPaths(getDirName(), filename);
    matrix.saveToFile(outputPath);
}

// Run the tests
runTests(); 