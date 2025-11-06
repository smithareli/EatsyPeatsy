#include <iostream>
#include <vector>
#include "Business.h"
using namespace std;
void merge(vector<Business>& businesses, int start, int mid, int end){
    vector<Business> temp;
    int i=start;
    int j=mid+1;
    while(i<=mid && j<=end){
        if(businesses[i].stars>=businesses[j].stars){
            temp.push_back(businesses[i]);
            i+=1;
        }
        else{
            temp.push_back(businesses[j]);
            j+=1;
        }
    }
    while(i<=mid){
        temp.push_back(businesses[i]);
        i+=1;
    }
    while(j<=end){
        temp.push_back(businesses[j]);
        j+=1;
    }
    for (int n=start; n<=end; n++){
        businesses[n]=temp[n-start];
    }
    
}
void mergesort(vector<Business>& businesses, int start, int end){
    if (start<end){
        int middle=(start+end)/2;
        mergesort(businesses,start, middle);
        mergesort(businesses,middle+1, end);
        merge(businesses, start, middle, end);
    }
}