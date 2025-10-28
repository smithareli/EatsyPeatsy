#include <iostream>
#include <fstream>
#include <vector>
#include <string>


#include "include/rapidjson/document.h"

using namespace std;

struct Business {
    string business_id;
    string name;
    double stars;
    string city;
    vector<string> categories;
};

vector<string> splitCategories(const string& cats_str) {
    vector<string> result;
    string cat;
    for (char c : cats_str) {
        if (c == ',') {
            if (!cat.empty()) result.push_back(cat);
            cat = "";  // reset for next category
        } else if (c != ' ') { // skip spaces
            cat += c;
        }
    }
    if (!cat.empty()) result.push_back(cat); // add last category
    return result;
}

int main() {
    ifstream file("yelp_academic_dataset_business.json");
    if (!file.is_open()) {
        cerr << "Cannot open file! Make sure it's in the project directory or use the full path.\n";
        return 1;
    }

    vector<Business> businesses;

    string line;
    while (getline(file, line)) {
        rapidjson::Document doc;
        doc.Parse(line.c_str());

        if (doc.HasParseError()) continue; // skip invalid lines

        Business b;
        b.business_id = doc["business_id"].GetString();
        b.name = doc["name"].GetString();
        b.stars = doc["stars"].GetDouble();
        b.city = doc["city"].GetString();

        b.categories.clear();
        if (doc.HasMember("categories")) {
            if (doc["categories"].IsArray()) {
                for (auto& c : doc["categories"].GetArray()) {
                    b.categories.push_back(c.GetString());
                }
            } else if (doc["categories"].IsString()) {
                string cats_str = doc["categories"].GetString();
                vector<string> split = splitCategories(cats_str);
                b.categories.insert(b.categories.end(), split.begin(), split.end());
            }
        }

        businesses.push_back(move(b));
    }

    cout << "Loaded " << businesses.size() << " businesses.\n";

    // Example: print first 5 businesses
    for (size_t i = 0; i < 5 && i < businesses.size(); ++i) {
        const auto& b = businesses[i];
        cout << b.business_id << ", " << b.name << ", " << b.stars << ", " << b.city << "\n";
        cout << "Categories: ";
        for (const auto& cat : b.categories) cout << cat << " ";
        cout << "\n----------------\n";
    }


    return 0;
}