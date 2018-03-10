#include <SoftwareSerial.h>

SoftwareSerial SerialMeter(3,SW_SERIAL_UNUSED_PIN);
 int i = 0;
void setup() {

   Serial.begin(115200);
  // put your setup code here, to run once:
  Serial1.begin(115200, SERIAL_8N1);
  SerialMeter.begin(115200);
 
 // Serial.write("working");
 
  Serial.swap();
}

void loop() {
  // put your main code here, to run repeatedly:
//  if(SerialMeter.available())
//  {
//  Serial.println(SerialMeter.read());
//  Serial.println(i);
//  i++;
//  } 
  if(SerialMeter.available())
  {
    Serial.println(SerialMeter.read());
  }
  
}
