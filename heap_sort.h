#include <iostream>
#include <vector>
using namespace std;
class BinaryHeap{
    vector<int> heapArray;
    void heapifyDown(int index){
        if (heapArray[index]<heapArray[2*index+1] || heapArray[index]<heapArray[2*index]){
            int biggest;
            if(heapArray[2*index+1]>heapArray[2*index]){
                biggest=2*index+1;
            }
            else{
                biggest=2*index;
            }
                int temp=heapArray[biggest];
                heapArray[biggest]=heapArray[index];
                heapArray[index]=temp;
                heapifyDown(biggest);
            
        }
    }
    public:
    void insert(int num){
        heapArray.push_back(num);
        int child=heapArray.size()-1;
        int parent=(child-1)/2;
        while(parent>=0 && heapArray[parent]<heapArray[child]){
            int temp=heapArray[parent];
            heapArray[parent]=heapArray[child];
            heapArray[child]=temp;
            child=parent;
            parent=(child-1)/2;
        }
    }
    int deletion(){
        int temp=heapArray[0];
        heapArray[0]=heapArray[heapArray.size()-1];
        heapArray.pop_back();
        heapifyDown(0);
    
    }
};