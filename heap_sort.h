#include <iostream>
#include <vector>
#include "Business.h"
using namespace std;
class BinaryHeap{
    vector<Business*> heapArray;
    void heapifyDown(int index){
        if (((2*index+1)<heapArray.size()&& (heapArray[index]->stars)<(heapArray[2*index+1]->stars) )||((2*index+2)<heapArray.size() && (heapArray[index]->stars
        )<(heapArray[2*index+2]->stars))){
            int biggest;
            if((heapArray[2*index+1]->stars)>(heapArray[2*index+2])->stars){
                biggest=2*index+1;
            }
            else{
                biggest=2*index+2;
            }
                Business* temp=heapArray[biggest];
                heapArray[biggest]=heapArray[index];
                heapArray[index]=temp;
                heapifyDown(biggest);
            
        }
    }
    public:
    BinaryHeap(){
        
    }
    void insert(Business* Bus){
        heapArray.push_back(Bus);
        int child=heapArray.size()-1;
        int parent=(child-1)/2;
        while(parent>=0 && (heapArray[parent]->stars)<(heapArray[child]->stars)){
            Business* temp=heapArray[parent];
            heapArray[parent]=heapArray[child];
            heapArray[child]=temp;
            child=parent;
            parent=(child-1)/2;
        }
    }
    Business* deletion(){
        Business* temp=heapArray[0];
        heapArray[0]=heapArray[heapArray.size()-1];
        heapArray.pop_back();
        heapifyDown(0);
        return temp;

    
    }
    vector<Business*> heapsort(vector<Business*> heap, int size){
        for (auto item: heap){
            insert(item);
        }
        vector<Business*> final;
        for (int i=0; i<size; i++){
            final.push_back(deletion());
        }
        return final;
    }
};