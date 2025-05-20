/**
 * Automated run script for sparse matrix operations
 */

const SparseMatrix = require('./SparseMatrix');
const path = require('path');

function main() {
    console.log("\n=== Automated Sparse Matrix Operations ===\n");
    
    try {
        // Part 1: Use the large sample matrices (incompatible for operations)
        console.log("PART 1: Testing with large sample matrices\n");
        
        const matrix1Path = path.join(__dirname, '..', '..', 'sample_inputs', 'matrixfile1.txt');
        const matrix2Path = path.join(__dirname, '..', '..', 'sample_inputs', 'matrixfile3.txt');
        
        console.log(`Matrix 1 Path: ${matrix1Path}`);
        console.log(`Matrix 2 Path: ${matrix2Path}`);
        
        console.log("\nLoading matrices...");
        const matrix1 = new SparseMatrix(matrix1Path);
        const matrix2 = new SparseMatrix(matrix2Path);
        console.log("Matrices loaded successfully!\n");
        
        console.log(`Matrix 1: ${matrix1.rows}x${matrix1.cols} with ${matrix1.elementCount} non-zero elements`);
        console.log(`Matrix 2: ${matrix2.rows}x${matrix2.cols} with ${matrix2.elementCount} non-zero elements\n`);
        
        console.log("--- Testing All Operations with Large Matrices ---\n");
        
        // Test matrix addition
        try {
            console.log("1. Testing Addition");
            if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
                console.log("   Cannot perform addition: Matrix dimensions don't match\n");
            } else {
                const result = matrix1.add(matrix2);
                console.log(`   Addition result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                result.saveToFile(path.join(__dirname, 'addition_result_large.txt'));
                console.log("   Addition result saved to addition_result_large.txt\n");
            }
        } catch (error) {
            console.error(`   Addition error: ${error.message}\n`);
        }
        
        // Test matrix subtraction
        try {
            console.log("2. Testing Subtraction");
            if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
                console.log("   Cannot perform subtraction: Matrix dimensions don't match\n");
            } else {
                const result = matrix1.subtract(matrix2);
                console.log(`   Subtraction result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                result.saveToFile(path.join(__dirname, 'subtraction_result_large.txt'));
                console.log("   Subtraction result saved to subtraction_result_large.txt\n");
            }
        } catch (error) {
            console.error(`   Subtraction error: ${error.message}\n`);
        }
        
        // Test matrix multiplication
        try {
            console.log("3. Testing Multiplication");
            if (matrix1.cols !== matrix2.rows) {
                console.log("   Cannot perform multiplication: Matrix dimensions don't match\n");
            } else {
                const result = matrix1.multiply(matrix2);
                console.log(`   Multiplication result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                result.saveToFile(path.join(__dirname, 'multiplication_result_large.txt'));
                console.log("   Multiplication result saved to multiplication_result_large.txt\n");
            }
        } catch (error) {
            console.error(`   Multiplication error: ${error.message}\n`);
        }
        
        // Part 2: Use the small sample matrices (compatible for operations)
        console.log("\n\nPART 2: Testing with small sample matrices\n");
        
        const testMatrix1Path = path.join(__dirname, '..', '..', 'sample_inputs', 'test_matrix1.txt');
        const testMatrix2Path = path.join(__dirname, '..', '..', 'sample_inputs', 'test_matrix2.txt');
        const testMatrix3Path = path.join(__dirname, '..', '..', 'sample_inputs', 'test_matrix3.txt');
        
        console.log(`Test Matrix 1 Path: ${testMatrix1Path}`);
        console.log(`Test Matrix 2 Path: ${testMatrix2Path}`);
        console.log(`Test Matrix 3 Path: ${testMatrix3Path}`);
        
        console.log("\nLoading test matrices...");
        const testMatrix1 = new SparseMatrix(testMatrix1Path);
        const testMatrix2 = new SparseMatrix(testMatrix2Path);
        const testMatrix3 = new SparseMatrix(testMatrix3Path);
        console.log("Test matrices loaded successfully!\n");
        
        console.log(`Test Matrix 1: ${testMatrix1.rows}x${testMatrix1.cols} with ${testMatrix1.elementCount} non-zero elements`);
        console.log(`Test Matrix 2: ${testMatrix2.rows}x${testMatrix2.cols} with ${testMatrix2.elementCount} non-zero elements`);
        console.log(`Test Matrix 3: ${testMatrix3.rows}x${testMatrix3.cols} with ${testMatrix3.elementCount} non-zero elements\n`);
        
        console.log("--- Testing Operations with Test Matrices ---\n");
        
        // Test matrix addition
        try {
            console.log("1. Testing Addition");
            if (testMatrix1.rows !== testMatrix2.rows || testMatrix1.cols !== testMatrix2.cols) {
                console.log("   Cannot perform addition: Matrix dimensions don't match\n");
            } else {
                const result = testMatrix1.add(testMatrix2);
                console.log(`   Addition result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                console.log(`   Result contents:\n${result.toString()}`);
                result.saveToFile(path.join(__dirname, 'addition_result.txt'));
                console.log("   Addition result saved to addition_result.txt\n");
            }
        } catch (error) {
            console.error(`   Addition error: ${error.message}\n`);
        }
        
        // Test matrix subtraction
        try {
            console.log("2. Testing Subtraction");
            if (testMatrix1.rows !== testMatrix2.rows || testMatrix1.cols !== testMatrix2.cols) {
                console.log("   Cannot perform subtraction: Matrix dimensions don't match\n");
            } else {
                const result = testMatrix1.subtract(testMatrix2);
                console.log(`   Subtraction result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                console.log(`   Result contents:\n${result.toString()}`);
                result.saveToFile(path.join(__dirname, 'subtraction_result.txt'));
                console.log("   Subtraction result saved to subtraction_result.txt\n");
            }
        } catch (error) {
            console.error(`   Subtraction error: ${error.message}\n`);
        }
        
        // Test matrix multiplication
        try {
            console.log("3. Testing Multiplication");
            if (testMatrix1.cols !== testMatrix3.rows) {
                console.log("   Cannot perform multiplication: Matrix dimensions don't match\n");
            } else {
                const result = testMatrix1.multiply(testMatrix3);
                console.log(`   Multiplication result: ${result.rows}x${result.cols} with ${result.elementCount} non-zero elements`);
                console.log(`   Result contents:\n${result.toString()}`);
                result.saveToFile(path.join(__dirname, 'multiplication_result.txt'));
                console.log("   Multiplication result saved to multiplication_result.txt\n");
            }
        } catch (error) {
            console.error(`   Multiplication error: ${error.message}\n`);
        }
        
        console.log("All operations tested!");
        
    } catch (error) {
        console.error(`\nError: ${error.message}`);
    }
}

main(); 