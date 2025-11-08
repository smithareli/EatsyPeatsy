#define WIN32_LEAN_AND_MEAN
#define _WIN32_WINNT 0x0A00
#define WINVER 0x0A00

#include <windows.h>
#undef byte

#include "include/httplib.h"
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "heap_sort.h"
#include "Business.h"
#include "merge_sort.h"
#include "include/rapidjson/document.h"
#include "include/trie.h"
using namespace std;

Trie trie;


vector<string> splitCategories(const string& cats_str) {
    vector<string> result;
    string cat;
    for (char c : cats_str) {
        if (c == ',') {
            if (!cat.empty()) result.push_back(cat);
            cat = "";  
        } else if (c != ' ') { 
            cat += c;
        }
    }
    if (!cat.empty()) result.push_back(cat);
    return result;
}

vector<Business> filter(vector<Business>& list, string keyword){ 
    int i = 0; 
    vector<Business> result; 
    for (int i = 0; i<list.size(); i++){
        vector<string>& categories = list[i].categories; 
        bool found = false; 
        for (int j = 0; j<categories.size(); j++){
            if (categories[j] == keyword){
                found = true; 
                break;
            }
        }

        if (found){
            result.push_back(list[i]);
        }
    }
    return result;
}
string escapeJson(const string& input) {
    string output;
    for (char c : input) {
        switch (c) {
            case '\"': output += "\\\""; break;
            case '\\': output += "\\\\"; break;
            case '\b': output += "\\b"; break;
            case '\f': output += "\\f"; break;
            case '\n': output += "\\n"; break;
            case '\r': output += "\\r"; break;
            case '\t': output += "\\t"; break;
            default: output += c; break;
        }
    }
    return output;
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

        if (doc.HasParseError()) continue; 

        Business b;
        b.business_id = doc["business_id"].GetString();
        b.name = doc["name"].GetString();
        b.stars = doc["stars"].GetDouble();
        b.city = doc["city"].GetString();

        trie.insert(b.name);

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

        businesses.push_back(std::move(b));
    }

    cout << "Loaded " << businesses.size() << " businesses.\n";
    vector<Business*> tests_1;
    businesses = filter(businesses, "Restaurants");

    // Example: print first 5 businesses
    for (size_t i = 0; i < 100 && i < businesses.size(); ++i) {
        const auto& b = businesses[i];
        tests_1.push_back(&businesses[i]);
        cout << b.business_id << ", " << b.name << ", " << b.stars << ", " << b.city << "\n";
        cout << "Categories: ";
        for (const auto& cat : b.categories) cout << cat << " ";
        cout << "\n----------------\n";
    }
    cout<< "New size: " << businesses.size();
    BinaryHeap final= BinaryHeap();
    vector<Business> businesses_final=final.heapsort(businesses,businesses.size());
    /////testing//// 
    /*BinaryHeap test_1= BinaryHeap();
    vector <Business*> final=test_1.heapsort(tests_1, 5);
    for (auto item: final){
        cout<<item->name<<","<< item->stars<<endl;
    }
    mergesort(tests_1,0,4);
    for (auto item: tests_1){
        cout<<item->name<<","<< item->stars<<endl;
    }*/


    httplib::Server svr;

    svr.Options("/autocomplete", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
    });

    svr.Get("/autocomplete", [](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");

        if (!req.has_param("prefix")) {
            res.status = 400;
            res.set_content("{\"error\":\"missing prefix\"}", "application/json");
            return;
        }

        string prefix = req.get_param_value("prefix");
        auto suggestions = trie.autocomplete(prefix);
        string json = "[";
        for (size_t i = 0; i < suggestions.size(); i++) {
            json += "\"" + suggestions[i] + "\"";
            if (i != suggestions.size() - 1) json += ",";
        }
        json += "]";
        res.set_content(json, "application/json");
    });

    svr.Get("/search", [&businesses_final](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");

    if (!req.has_param("prefix")) {
        res.status = 400;
        res.set_content("{\"error\":\"missing prefix\"}", "application/json");
        return;
    }

    string prefix = req.get_param_value("prefix");
    auto suggestions = trie.autocomplete(prefix);

    vector<Business> matched;
    for (const auto& name : suggestions) {
        for (const auto& b : businesses_final) {
            if (b.name == name) {
                matched.push_back(b);
                break;
            }
        }
    }

    string json = "[";
    for (size_t i = 0; i < matched.size(); i++) {
        const auto& b = matched[i];
        json += "{";
        json += "\"id\":\"" + escapeJson(b.business_id) + "\",";
        json += "\"name\":\"" + escapeJson(b.name) + "\",";
        std::ostringstream oss;
        oss << std::fixed << std::setprecision(1) << b.stars;
        json += "\"stars\":" + oss.str() + ",";
        json += "\"city\":\"" + escapeJson(b.city) + "\"";
        json += "}";
        if (i != matched.size() - 1) json += ",";
    }
    json += "]";

    res.set_content(json, "application/json");
});

    
     svr.Get("/full", [&businesses_final](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");

        
        string json = "[";
        for (size_t i = 0; i < businesses_final.size(); i++) {
            const auto& b = businesses_final[i];
            json += "{";
            json += "\"id\":\"" + escapeJson(b.business_id) + "\",";
            json += "\"name\":\"" + escapeJson(b.name) + "\",";
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(1) << b.stars;
            json += "\"stars\":" + oss.str() + ",";
            json += "\"city\":\"" + escapeJson(b.city) + "\"";
            json += "}";
            if (i != businesses_final.size() - 1) json += ",";
        }
        json += "]";

        res.set_content(json, "application/json");
    });

    svr.Get("/filter", [&businesses](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");

        if (!req.has_param("keyword")) {
            res.status = 400;
            res.set_content("{\"error\":\"missing keyword\"}", "application/json");
            return;
        }

        string allkeywords = req.get_param_value("keyword");
        vector<string> keywords = splitCategories(allkeywords);
        vector<Business> filtered;
        for (int i = 0; i<keywords.size(); i++) {
            vector<Business> partial = filter(businesses, keywords[i]);
            filtered.insert(filtered.end(), partial.begin(), partial.end());
        }
        unordered_set<string> seen;
        vector<Business> uniqueFiltered;
        for (const auto& b : filtered) {
            if (seen.find(b.business_id) == seen.end()) {
                uniqueFiltered.push_back(b);
                seen.insert(b.business_id);
            }
        }
        filtered = uniqueFiltered;
        mergesort(filtered,0,filtered.size()-1);

        string json = "[";
        for (size_t i = 0; i < filtered.size(); i++) {
            const auto& b = filtered[i];
            json += "{";
            json += "\"id\":\"" + escapeJson(b.business_id) + "\",";
            json += "\"name\":\"" + escapeJson(b.name) + "\",";
            std::ostringstream oss;
            oss << std::fixed << std::setprecision(1) << b.stars;
            json += "\"stars\":" + oss.str() + ",";
            json += "\"city\":\"" + escapeJson(b.city) + "\"";
            json += "}";
            if (i != filtered.size() - 1) json += ",";
        }
        json += "]";

        res.set_content(json, "application/json");
    });


    cout << "Server listening on http://localhost:8080\n";
    svr.listen("127.0.0.1", 8080);

    return 0;
}