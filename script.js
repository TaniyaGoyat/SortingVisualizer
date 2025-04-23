const arrayContainer = document.getElementById("array-container");
let array = [];

// Generate a random array and display it
function generateArray() {
  array = [];
  arrayContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const value = Math.floor(Math.random() * 400) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.style.width = "15px";
    bar.className = "bar";
    arrayContainer.appendChild(bar);
  }
}

// Visualize the array update
function visualizeArray(delay = 50) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      if (array[j] > array[j + 1]) {
        // Swap the values
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Update bar heights
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await visualizeArray(50);
      bars[j].style.backgroundColor = "#4caf50";
      bars[j + 1].style.backgroundColor = "#4caf50";
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "blue";

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";

      if (array[j] < array[minIdx]) {
        bars[minIdx].style.backgroundColor = "#4caf50";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "blue";
      }

      await visualizeArray(50);
      bars[j].style.backgroundColor = "#4caf50";
    }

    if (minIdx !== i) {
      // Swap the values
      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      // Update bar heights
      bars[i].style.height = `${array[i]}px`;
      bars[minIdx].style.height = `${array[minIdx]}px`;
    }
    bars[minIdx].style.backgroundColor = "#4caf50";
  }
}

// Merge Sort Visualization
async function mergeSort(arr = array, bars = document.getElementsByClassName("bar")) {
  // Base case: if the array has 1 or fewer elements, it's already sorted
  if (arr.length <= 1) return arr;

  // Split the array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Recursively split and merge
  await mergeSort(left, bars);
  await mergeSort(right, bars);

  // Merge the two halves
  await merge(arr, left, right, bars);
  return arr;
}

// Merge two sorted halves and update bars
async function merge(arr, left, right, bars) {
  let i = 0, j = 0, k = 0;

  // Merge the arrays
  while (i < left.length && j < right.length) {
    // Change bar color to indicate comparison
    bars[k].style.backgroundColor = "red";
    bars[k + 1].style.backgroundColor = "red";
    
    if (left[i] < right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }

    k++;
    await visualizeArray(50); // Wait for visualization to update
    bars[k - 1].style.backgroundColor = "#4caf50"; // Reset bar color to green
  }

  // Handle any remaining elements in the left or right array
  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = `${left[i]}px`;
    i++;
    k++;
    await visualizeArray(50);
    bars[k - 1].style.backgroundColor = "#4caf50";
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = `${right[j]}px`;
    j++;
    k++;
    await visualizeArray(50);
    bars[k - 1].style.backgroundColor = "#4caf50";
  }
}

// Insertion Sort Visualization
async function insertionSort() {
  const bars = document.getElementsByClassName("bar");

  // Traverse through each element in the array
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    // Highlight the current element (key)
    bars[i].style.backgroundColor = "red";

    // Move elements of array[0..i-1] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && array[j] > key) {
      bars[j].style.backgroundColor = "red"; // Highlight the element being compared

      // Move the larger element to the right
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`; // Update the bar height

      // Visualize array update
      await visualizeArray(50); // Wait for a brief moment to visualize the change

      // Reset the color of the element that was just compared
      bars[j].style.backgroundColor = "#4caf50";
      j = j - 1;
    }

    // Place the key element in its correct position
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`; // Update the bar height for the sorted element

    // Reset the color of the key element after insertion
    bars[i].style.backgroundColor = "#4caf50";
  }
}
