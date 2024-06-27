#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <HCSR04.h>


// Konfigurasi WiFi (ganti dengan kredensial Anda)
#define WIFI_SSID "sena wiwiwiwiw"
#define WIFI_PASSWORD "123456789"

// Konfigurasi Firestore (ganti dengan kredensial Anda)
#define FIREBASE_HOST "nama-proyek-anda.firebaseio.com"
#define FIREBASE_AUTH "Kunci_Otentikasi_Firestore_Anda"

// // Pin sensor ultrasonik
// #define TRIGGER_PIN D5
// #define ECHO_PIN D6

// Inisialisasi Firebase
FirebaseData firebaseData;
FirebaseJson json;
HCSR04 hc(D5, D6); //initialisation class HCSR04 (trig pin , echo pin)

void setup() {
  Serial.begin(115200);

  // Menghubungkan ke WiFi sebagai Station
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Menghubungkan ke WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nTerhubung ke WiFi!");

//   pinMode(TRIGGER_PIN, OUTPUT);
//   pinMode(ECHO_PIN, INPUT);

  // Inisialisasi Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  // Baca jarak dari sensor ultrasonik
//   digitalWrite(TRIGGER_PIN, LOW);
//   delayMicroseconds(2);
//   digitalWrite(TRIGGER_PIN, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIGGER_PIN, LOW);
//   long duration = pulseIn(ECHO_PIN, HIGH);
//   float distance = (duration * 0.0343) / 2;

    float distance = hc.dist();

  // Kirim data ke Firestore setiap 30 menit
  if (millis() % (30 * 60 * 1000) == 0) { // 30 menit dalam milidetik
    json.set("/jarak", distance);
    if (Firebase.pushJSON(firebaseData, "/data_sensor", json)) {
      Serial.println("Data berhasil dikirim ke Firestore.");
    } else {
      Serial.println("Gagal mengirim data ke Firestore.");
    }
  }

  delay(1000); // Baca jarak setiap 1 detik (sesuaikan jika perlu)
}
