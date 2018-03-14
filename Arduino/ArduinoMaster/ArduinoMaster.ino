#include "DataParser.h"

int i = 0;
String Data;
void setup() {

   Serial.begin(115200);
  // put your setup code here, to run once:
  //SerialMeter.begin(115200);
 

}

void loop() {

  if(Serial.available())
  {
    char c = Serial.read();

    if(c == '\n')
    {
      Serial.println("enterfound");
    }
    if(c == '/')
    {
      Data = "";
      Serial.println("datastream started");
    }
    
    if(c == '!')
    {
      Serial.println("data received");
      Serial.print(Data);
      dataToLines(Data);
     
    } 
    Data.concat(c);
   // appendChar(Data, c);
    //Data = Data + c;
    

  }
  
}


void appendChar(char* string, char c)
{
  int len = strlen(string);
  string[len] = c; 
  string[len +1] = '\0';
  
}



void dataToLines(String data)
{
  char* line;
  int lineIndex = 0;
  const char s[2] = "\n";
  boolean parsing = true;
  const char* lines[25];
  
  while(parsing)
  {
    line = strtok(data, s);  
    if(line != NULL)
    {
    lines[lineIndex] = line;
    lineIndex++;
    }
    else 
    {
      parsing = false;
      parseLines(lines);
    }
  }
}

void parseLines(const char** lines) {
  int index = 0;
  while(true) {
    Serial.println(lines[index]);
    if(lines[index] == NULL) {
      break;
    }
  }
}

