Instructions for downloading data set:
1. Go to: https://business.yelp.com/data/resources/open-dataset/
2. Scroll down and click "Download JSON"
3. Unzip and open "Yelp JSON" -> "yelp_dataset"
4. Drag "yelp_academic_dataset_business.json" into program

Instructions for running code on a MacOS device:
1. Delete line 5 of main.cpp: #include <windows.h>
2. Open terminal and run
      g++ -std=c++17 main.cpp trie.cpp -I./include -o backend_server
      ./backend_server
3. Open new terminal and run
      cd eat_front_end
      npm start
   
Instructions for running on a Windows device:
1. Open terminal and run
      g++ -std=c++17 main.cpp trie.cpp -Iinclude -lws2_32 -lwinmm -o backend_server.exe
      ./backend_server.exe
2. Open new terminal and run
      cd eat_front_end
      npm start
   
