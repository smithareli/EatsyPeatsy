#include <iostream>
#include <vector>
using namespace std;
class BinaryHeap{
    vector<int> heapArray;
    void heapifyDown(int index){
        if (((2*index+1)<heapArray.size()&& heapArray[index]<heapArray[2*index+1] )||((2*index+2)<heapArray.size() && heapArray[index]<heapArray[2*index+2])){
            int biggest;
            if(heapArray[2*index+1]>heapArray[2*index+2]){
                biggest=2*index+1;
            }
            else{
                biggest=2*index+2;
            }
                int temp=heapArray[biggest];
                heapArray[biggest]=heapArray[index];
                heapArray[index]=temp;
                heapifyDown(biggest);
            
        }
    }
    public:
    BinaryHeap(){
        
    }
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
        return temp;

    
    }
    vector<int> heapsort(vector<int> heap, int size){
        for (auto item: heap){
            insert(item);
        }
        vector<int> final;
        for (int i=0; i<size; i++){
            final.push_back(deletion());
        }
        return final;
    }
};