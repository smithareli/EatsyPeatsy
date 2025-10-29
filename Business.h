#include <iostream>
#include <vector>
#include <string>
#pragma once
using namespace std;
struct Business {
    string business_id;
    string name;
    double stars;
    string city;
    vector<string> categories;
};