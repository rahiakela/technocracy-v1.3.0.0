import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleFileUploadService {

  constructor(private storage: AngularFireStorage) { }

  upload(editor: any, file: any, uploadPath: string) {
    const filePath = `${uploadPath}/${file.name}`;
    const fileRef = this.storage.ref(`${filePath}`);
    const uploadTask = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    uploadTask.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(imageURL => {
            console.log(`Image URL: ${imageURL}`);
            // push image url to rich editor.
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imageURL);
          });
        })
      )
      .subscribe();
  }
}
