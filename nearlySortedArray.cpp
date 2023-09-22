#include <iostream>
using namespace std;

int nearlyBinarySearch(int arr[], int size, int target) {
    int s = 0;
    int e = size-1;
    int mid = s + (e - s) / 2;

    while (s <= e) {
        if (arr[mid] == target)
        {
            return mid;
        }
        else if (mid+1 < size && arr[mid+1] == target)
        {
            return mid+1;
        }
        else if (mid-1 >= 0 && arr[mid-1] == target)
        {
            return mid-1;
        }
        else if (target < arr[mid])
        {
            e = mid - 2;
        }
        else{
            s = mid + 2;
        }
        mid = s + (e - s) / 2;
    }
    return -1;
}

int main() {
    int arr[] = {20,10,30,50,40,70,60};
    int size = sizeof(arr) / sizeof(int);
    int target = 70;
    cout << nearlyBinarySearch(arr,size,target);
}