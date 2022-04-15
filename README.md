# Yumzy Restaurant Partner Application

## Generating the APK For Mobile Installation.

1. Make production build using command ` npm run ionic-android-release`
2. Sign APK using Following Commands :
	`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore yumzy-order-key.keystore .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk alias_name`
3.  Compress the Application : `C:\Users\%username%\AppData\Local\Android\Sdk\build-tools\29.0.0\zipalign -v 4 .\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk .\platforms\android\app\build\outputs\apk\release\yumzy_partner_order.apk`

## Generating the Bundle For Google Play Store Release.

1. Make production build using command :  ` npm run ionic-android-release`.
2. Generate bundle :  `cd .\platforms\android  && gradlew bundle`
3. Go To Project Root Dir : ` cd ../..`
3. Signing an app bundle: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore yumzy-order-key.keystore .\platforms\android\app\build\outputs\bundle\release\app.aab alias_name`
4. Share the .aab file for Release. File Localtion: `.\platforms\android\app\build\outputs\bundle\release\app.aab`


# Password For Keystore : Laalsa@123

Comment Following line in : .\restaurant-dashboard-v2-ionic\platforms\android\app\build.gradle
    // apply plugin: 'com.google.gms.google-services'
