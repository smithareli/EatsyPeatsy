#ifndef TRIE_H
#define TRIE_H

#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd;
    TrieNode() : isEnd(false) {}
};

class Trie {
private:
    TrieNode* root;
    void collectAllWords(TrieNode* node, string prefix, vector<string>& results);
public:
    Trie();
    void insert(const std::string& word);
    vector<string> autocomplete(const string& prefix);
};

#endif
