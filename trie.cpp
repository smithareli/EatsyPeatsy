#include "include/trie.h"
#include <cctype>

using namespace std;

Trie::Trie() {
    root = new TrieNode();
}

void Trie::insert(const string& word) {
    TrieNode* node = root;
    for (char c : word) {
        c = tolower(c);
        if (!node->children[c])
            node->children[c] = new TrieNode();
        node = node->children[c];
    }
    node->isEnd = true;
}

void Trie::collectAllWords(TrieNode* node, string prefix, vector<string>& results) {
    if (!node) return;
    if (node->isEnd) results.push_back(prefix);
    for (auto& pair : node->children)
        collectAllWords(pair.second, prefix + pair.first, results);
}

std::vector<string> Trie::autocomplete(const string& prefix) {
    TrieNode* node = root;
    for (char c : prefix) {
        c = tolower(c);
        if (!node->children[c]) return {};
        node = node->children[c];
    }
    vector<string> results;
    collectAllWords(node, prefix, results);
    return results;
}
