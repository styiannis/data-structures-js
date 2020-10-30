export function toBe(label, condition, expectedValue) {
    test(label, function() { return expect(condition).toBe(expectedValue); });
}

/*export function toBeTrue(label, condition) {
    toBe(label, condition, true);
}

export function toBeFalse(label, condition) {
    toBe(label, condition, false);
}*/

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, pivot, left, right) {
    
    let pivotValue = arr[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
    
        if (arr[i] < pivotValue) {
            swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    
    swap(arr, right, partitionIndex);
    
    return partitionIndex;
}

export function quickSort(inputArray) {

    function fn( arr, left, right ){

        let pivot, partitionIndex;
        let len = arr.length;
        
        if (left < right) {
            
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            
            fn(arr, left, partitionIndex - 1);
            fn(arr, partitionIndex + 1, right);
        }

        return arr;
    }

    return fn( inputArray, 0, inputArray.length - 1 );
}