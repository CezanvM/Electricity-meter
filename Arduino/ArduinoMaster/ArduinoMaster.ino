#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "./DNSServer.h"

String Datagram[20][3] = {
  { "1-3:0.2.8", "version" },
  {"0-0:96.1.1", "equipmentId", ""},
  {"1-0:1.8.1", "electricityTo1", "*kwh"},
  {"1-0:1.8.2", "electricityTo2", "*kwh"},
  {"1-0:2.8.1", "electricityBy1", "*kwh"},
  {"1-0:2.8.2", "electricityBy2", "*kwh"},
  {"0-0:96.14.0", "tariffId", ""},
  {"1-0:1.7.0", "electricityPowerDeliverd", "*kW"},
  {"1-0:2.7.0", "electricityPowerReceived", "*kW"},
  {"0-0:96.7.21", "nrOfPowerFailures", ""},
  //power failures
  {"1-0:32.32.0", "nrOfVoltageSags", ""},
  {"1-0:32.36.0", "nrOfVoltageSwells", ""},
  {"0-0:96.13.1", "textMessage1", ""},
  {"0-0:96.13.0", "textMessage2", ""},
  {"1-0:31.7.0", "current", "*A"},
  {"1-0:21.7.0", "activePowerPlus", "*kW"},
  {"1-0:22.7.0", "activePowerMin", "*kW"},
  {"0-1:24.1.0", "deviceType", ""},
  {"0-1:96.1.0", "equipmentId2", ""}
  //gas or water
};

int redPin = 14; 
int greenPin = 12;
int bluePin = 13;

String Data;
DynamicJsonBuffer jsonBuffer;
ESP8266WebServer server(80);
DNSServer dnsServer;
IPAddress IP(10, 10, 10, 1);
boolean wifiConnected = false;
              
//LA134-2016
//MAD2016TI
String ssid     = "";
String password = "";
String username = "";
String loginPassword = "";
const char* APssid = "slimmemeter";
const char* APpassword = "password";

// wifiClient
WiFiClient wifiClient;

// Only with some dummy values seems to work ... instead of mqttClient();
PubSubClient mqttClient("", 0, wifiClient);

const char *host = "165.227.180.251";
uint16_t port = 1234;
const char *topic = "measurement";
String html = "<h1>werkt lekker kenker</h1>";
String html2 = "<!DOCTYPE html>\n<html>\n<body>\n<h2> WIFI</h2>\nssid: <input type=\"text\" id=\"ssid\" value=\"\"><br>\npassword: <input type=\"text\" id=\"password\" value=\"\">\n<h2>LOGIN</h2>\nusername <input type=\"text\" id=\"username\" value=\"\"><br>\npassword <input type=\"text\" id=\"loginPassword\" value=\"\">\n<p><button onclick=\"login()\">Login</button></p>\n<script>\n\u0009var ssid; \n\u0009var password; \n\u0009var username; \n\u0009var loginPassword;\n\u0009var url = \"\"; \n\u0009\n\u0009function login()\n\u0009{\n\u0009url = \"\";\n\u0009ssid = document.getElementById('ssid').value;\n\u0009password = document.getElementById('password').value;\n\u0009username = document.getElementById('username').value;\n\u0009loginPassword = document.getElementById('loginPassword').value;\n\u0009\n\u0009insertParam(\"ssid\",ssid);\n\u0009insertParam(\"password\",password);\n\u0009insertParam(\"username\",username);\n\u0009insertParam(\"loginPassword\",loginPassword);\n\u0009\n\u0009document.location.search = url;\n\u0009}\n\u0009function insertParam(key, value)\n\u0009{\n\n    key = encodeURI(key); value = encodeURI(value);\n\n    var kvp = document.location.search.substr(1).split('&');\n\u0009console.log(kvp);\n    var i=kvp.length; var x; while(i--) \n    {\n        x = kvp[i].split('=');\n\n        if (x[0]==key)\n        {\n            x[1] = value;\n            kvp[i] = x.join('=');\n            break;\n        }\n    }\n\n    if(i<0) {kvp[kvp.length] = [key,value].join('=');}\n\u0009\n    //this will reload the page, it's likely better to store this until finished\n\u0009url = url + kvp.join('&');\n\u0009console.log(url);\n}\n</script>\n</body>\n</html>";

void setup() {   

pinMode(redPin, OUTPUT);
pinMode(greenPin, OUTPUT);
pinMode(bluePin, OUTPUT);
  
  delay(1000);
  Serial.begin(115200);
  ApSetUp();

}

void connectionSetUp()
{
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(1000);
  int connectionIndex = 0;
 // Serial.println(ssid.c_str());
 // Serial.println(password.c_str());
 // const char* tempSsid = ssid.c_str();
 // const char* tempPass = password.c_str();
  WiFi.begin(ssid.c_str(), password.c_str());
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("connecting");
    wifiConnected = true;
    if(connectionIndex > 20)
    {
      //show errorLED;
      Serial.println("Connection timed out");
       setColor(255,1,1);
      wifiConnected = false; 
      break; 
    }
    connectionIndex++;
  }
}
void ApSetUp()
{
  setColor(255, 165,1);
  WiFi.mode(WIFI_AP);
  delay(1000);
  Serial.println();
  Serial.print("Configuring access point...");
  WiFi.softAPConfig(IP, IP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(APssid, APpassword);

  //dnsServer.start(53, "*", IP);
  Serial.print("AP IP address: ");
   //server.on("/", handleLogin);
  server.onNotFound([]() {
    server.send(200, "text/html", html2);
  });
  server.begin();
  Serial.println("HTTP server started");

  //connectionSetUp();
}

void loop() {
  if (wifiConnected)
  {
    ConnectedLoop();
  }
  else
  {
    APLoop();
  }
}

void APLoop()
{
  //dnsServer.processNextRequest();
  server.handleClient();
  if (ssid == "")
  {
    if (server.args() > 1)
    {
      for (int i = 0; i < server.args(); i++)
      {
        if (server.argName(i).equals("ssid"))
        {
          ssid = server.arg(i);
          password = server.arg(i + 1);
          username = server.arg(i + 2);
          loginPassword = server.arg(i + 3);

          Serial.println(ssid);
          Serial.println(password);
          Serial.println(username);
          Serial.println(loginPassword);
          server.send(200, "text/html", html);
          closeAP();
          connectionSetUp();
          break;
        }
      }
    }
  }
}

void closeAP()
{
  server.stop();
//  delete *server;
  WiFi.softAPdisconnect();
  delay(2000);
}

void ConnectedLoop()
{
  if (WiFi.status() == WL_CONNECTED) {
    if (!mqttClient.connected() ) {
      mqttConnect();
      delay(250);
    } else {
      mqttClient.loop();
      if (Serial.available())
      {
        char c = Serial.read();
        if (c == '/')
        {
          Data = "";
          Serial.println("datastream started");
        }

        if (c == '!')
        {
          Serial.println("end data received");
          //Serial.print(Data);
          JsonObject& object = dataToLinesStr(Data);
          char json[object.measureLength()];
          object.printTo((char*)json, object.measureLength() + 1);
          //          const char * json_ptr = json;
          Serial.println(json);
          //          Serial.println(sizeof(json));
          //                                    int error = mqttClient.publish(topic, json);
          //   Serial.println(error);
        }
        Data.concat(c);
      }
    }
  }
}

void setColor(int r, int g, int b)
{
  analogWrite(redPin, r);
  analogWrite(greenPin, g);
  analogWrite(bluePin, b);
}

void mqttConnect() {

  // Connect to mqtt broker and set callback
  mqttClient.setClient(wifiClient);
  mqttClient.setServer(host, port);
  
if (mqttClient.connect("esp8266", username.c_str(), loginPassword.c_str())) {
  //if (mqttClient.connect("esp8266", "cas", "password")) {
    Serial.printf("%s: MQTT connected to %s:%d\n", __FUNCTION__, host, port);
     setColor(1, 255,1);
  } else {
    Serial.printf("%s: MQTT connection ERROR (%s:%d)\n", __FUNCTION__, host, port);
    // WiFi.softAPdisconnect(true);
    setColor(255, 1,1);
  }
}

JsonObject& dataToLinesStr(String data)
{
  int lineIndex = 0;
  int from = 0;
  //int to = 0;
  String lines[100];
  for (int i = 0; i < data.length(); i++)
  {
    if (data[i] == '\n')
    {
      lines[lineIndex] = data.substring(from, i);
      lineIndex++;
      from = i;
    }
  }
  return parseLinesStr(lines, lineIndex);
}

JsonObject& parseLinesStr(String lines[], int ArraySize)
{
  JsonObject& measurement = jsonBuffer.createObject();
  //  measurement["sensorId"] = WiFi.macAddress();
  measurement["sensorId"] = "4B:4C:12:7A:21:ED";
  for (int i = 2; i < ArraySize; i++)
  {
    //Serial.print(lines[i]);
    findKey(lines[i], measurement);
  }

  return measurement;
}

void findKey(String line, JsonObject& measurement)
{
  // Serial.println(line);
  int index = 0;
  String  key = "";
  String rawValue = "";
  String timeStampKey = "0-0:1.0.0";

  while (line[index] != '(')
  {
    key = line.substring(0, index + 1);
    rawValue = line.substring(index, line.length() - 1);
    index++;

  }

  for (int i = 0; i < 20; i++)
  {
    if (key.indexOf(Datagram[i][0] ) > 0)
    {
      //  Serial.print("found key with name:");
      //Serial.print(Datagram[i][1]);
      //Serial.print( " with value = ");
      measurement[Datagram[i][1]] = findValue(rawValue, Datagram[i][2]);
    }
    else if (key.indexOf(timeStampKey) > 0)
    {
      //Serial.print(timeStampKey);
      //Serial.print(" Found Timestamp with value = ");
      //measurement["root"] = "hallo";
      measurement["timestamp"] = findTimeStamp(rawValue);
      break;
    }
    else
    {

    }
  }
}

String findTimeStamp(String rawValue)
{
  int index = 0;
  String value = "20";
  int from = 0;
  while (rawValue[index] != ')')
  {
    if (rawValue[index] == '(')
    {
      from = index + 1;
    }
    index++;
  }
  value += rawValue.substring(from, index - 1);
  return buildTimeStamp(value);
}

String buildTimeStamp(String notFormatedTime)
{
  String formatedTimeStamp = notFormatedTime.substring(0, 4);
  formatedTimeStamp += '-';
  formatedTimeStamp += notFormatedTime.substring(4, 6);
  formatedTimeStamp += '-';
  formatedTimeStamp += notFormatedTime.substring(6, 8);
  formatedTimeStamp += ' ';
  formatedTimeStamp += notFormatedTime.substring(8, 10);
  formatedTimeStamp += ':';
  formatedTimeStamp += notFormatedTime.substring(10, 12);
  formatedTimeStamp += ':';
  formatedTimeStamp += notFormatedTime.substring(12, 14);
  return formatedTimeStamp;


}

String findValue(String rawValue, String filter)
{
  int index = 0;
  String value = "";
  int from = 0;
  while (rawValue[index] != ')')
  {
    if (rawValue[index] == '(')
    {
      from = index + 1;
    }
    index++;
  }
  value = rawValue.substring(from, index - filter.length());

  return value;
}


