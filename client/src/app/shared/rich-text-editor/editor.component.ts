import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {UtilService} from '../../core/services/util.service';
import {GoogleFileUploadService} from '../../core/services/google-file-upload.service';

/* reference:
  https://github.com/KillerCodeMonkey/ngx-quill
  https://github.com/killerCodeMonkey/ngx-quill-example
  https://www.primefaces.org/primeng/#/editor
  https://github.com/KillerCodeMonkey/ngx-quill/issues/89
  https://github.com/quilljs/quill/issues/1400
  https://github.com/surmon-china/ngx-quill-editor/issues/24
*/
@Component({
  selector: 'tech-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnChanges {

  @Input()
  editorType: string;
  @Input()
  placeHolder: string;
  @Input()
  contentId: string;
  @Input()
  content: string;

  @Output()
  onEditorContentChange = new EventEmitter<any>();

  @ViewChild('editor')
  editor: QuillEditorComponent;

  editorConfig = {};

  constructor(private fileUploadService: GoogleFileUploadService, private utilService: UtilService) {
    this.editorConfig = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }],                                // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['link', 'image']                                 // link and image, video
      ]
    };
  }

  ngOnInit() {

    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.onEditorContentChange.emit(data.html);
      });

  }

  ngOnChanges(changes: SimpleChanges) {
    const content: SimpleChange = changes.content;
    // console.log('prev value: ', content.previousValue);
    // console.log('got name: ', content.currentValue);
    this.editor.writeValue(this.utilService.decodeHTML(
      content !== undefined ? content.currentValue : ''
    ));
  }

  onEditorCreated(editorInstance: any) {
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', () => {
      /**
       * Step1. select local image
       */
      const input: any = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();

      // Listen upload local image and save to AWS S3
      input.onchange = () => {
        const file = input.files[0];

        // file type is only image.
        if (/^image\//.test(file.type)) {
          // check the file size, it should not be more than 150KB=1024*150=153600
          if (file.size > 153600) {
            alert('Please make sure, the attached file should not be more than 150KB');
            return false;
          }
          /**
           * Step2. save to server
           */
          // construct the file path using editor type like blog or question and content type like blog id or question id
          const imagePath = `technocracy/images/${this.editorType}s/${this.contentId}`;
          // this is callback data: url
          this.fileUploadService.upload(editorInstance, file, imagePath);
          console.log('Done...');
        } else {
          alert('You could only upload images.');
        }
      };
    });
  }

  getHeight(): string {
    switch (this.editorType) {
      case 'comment':
        return '150px';

      case 'blog':
        return '400px';

      default:
        return '200px';
    }
  }
}
