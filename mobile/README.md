# NativeScript Tutorial Angular Template

This repo serves as the starting point for NativeScript’s [Angular Getting Started Guide](https://docs.nativescript.org/angular/tutorial/ng-chapter-0).

Please file any issues with this template on the [NativeScript/docs repository](https://github.com/nativescript/docs), which is where the tutorial content lives.

------------------------------------------------------------------------------------------------------------

You should give Genymotion a try! The solution works on top of Oracle VM VirtualBox and is a breeze compared to the normal emulator.

1-Register at genymotion.com, chose the free license (Free for personal use only).
2-Download and install Genymotion and Oracle VM VirtualBox.
3-At the installation directory of Genymotion to the PATH environment variable.
4-Add and configure a device with the Genymotion graphical user interface.
5-Start the device.
6-Verify in the "Genymotion shell" the name of the created device:
>>devices list
7-Start the demo:
>>npm install -g nativescript
>>genyshell -c "devices list"
>>tns run android --emulator --geny="device name"
We use the genyshell to figure out the exact name of the device.
Then we instruct the tns command to use the given Genymotion device instead of the normal Android emulator.
Previously we also defined an NPM script for that: npm run start-geny. Keep in mind that you have to adjust the device name in the package.json first.

-------------------------------------------------------------------------------------------------------------

##################Run App#################################################

Step 1- Build the app
tns build android

Step 2- Run the app with genymotion emulator
tns run android --emulator --geny="Google Nexus 5 - 5.1.0 - API 22 - 1080x1920"