import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { environment } from '../../../../environments/environment';

declare var window: any;
declare var device: any;

@Injectable({
  providedIn: 'root'
})
export class DownloaderUtilService {

  constructor() { }

  /**
   * Download file from phonegap app
   * @param filename 
   * @param data 
   * @param mimeType 
   */
  download(filename, data, mimeType) {
    if (environment.inPhonegap) {

      var blob = new Blob([data], {
        type: mimeType
      });
      if (window.cordova && window.cordova.platformId !== "browser") {
        document.addEventListener("deviceready", function () {
          var storageLocation = "";

          switch (device.platform) {
            case "Android":
              storageLocation = window.cordova.file.externalDataDirectory;
              break;

            case "iOS":
              storageLocation = window.cordova.file.documentsDirectory;
              break;
          }

          var folderPath = storageLocation;

          window.resolveLocalFileSystemURL(
            folderPath,
            function (dir) {
              dir.getFile(
                filename,
                {
                  create: true
                },
                function (file) {
                  file.createWriter(
                    function (fileWriter) {
                      fileWriter.write(blob);

                      fileWriter.onwriteend = function () {
                        var url = file.toURL();
                        window.cordova.plugins.fileOpener2.open(url, mimeType, {
                          error: function error(err) {
                            console.error(err);
                            alert("Unable to download");
                          },
                          success: function success() {
                            console.log("success with opening the file");
                          }
                        });
                      };

                      fileWriter.onerror = function (err) {
                        alert("Unable to download");
                        console.error(err);
                      };
                    },
                    function (err) {
                      // failed
                      alert("Unable to download");
                      console.error(err);
                    }
                  );
                },
                function (err) {
                  alert("Unable to download");
                  console.error(err);
                }
              );
            },
            function (err) {
              alert("Unable to download");
              console.error(err);
            }
          );
        });
      } else {
        saveAs(blob, filename);
      }
    }

  }
}
