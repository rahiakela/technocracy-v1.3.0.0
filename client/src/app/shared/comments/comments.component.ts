import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Comment} from "../models/comment-model";
import {UtilService} from "../../core/services/util.service";
import {User} from "../models/user-model";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'tech-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input()
  comments: Comment[];

  @Output()
  onCommentActionTriggered = new EventEmitter<any>();

  dialogRef: MatDialogRef<ConfirmationDialog>;

  constructor(public utilService: UtilService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const comments: SimpleChange = changes.comments;
    this.comments = comments.currentValue;
  }

  increaseCommentPatting(commentId: string) {
    this.onCommentActionTriggered.emit({
      action: 'comment-like',
      commentId: commentId
    });
  }

  editComment(commentId: string, content: string) {
    this.onCommentActionTriggered.emit({
      action: 'comment-edit',
      commentId: commentId,
      content: content
    });
  }

  addReply(commentId: string) {
    this.onCommentActionTriggered.emit({
      action: 'reply',
      commentId: commentId
    });
  }

  increaseReplyPatting(replyId: string, commentId: string) {
    this.onCommentActionTriggered.emit({
      action: 'reply-like',
      replyId: replyId,
      commentId: commentId
    });
  }

  editReply(replyId: string, content: string) {
    this.onCommentActionTriggered.emit({
      action: 'reply-edit',
      replyId: replyId,
      content: content
    });
  }

  openConfirmationDialog(actionId: string, action: string) {
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure want to delete your comment?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // do confirmation actions
        this.onCommentActionTriggered.emit({
          action: action,
          commentId: actionId,
          replyId: actionId
        });
      }
      this.dialogRef = null;
    });
  }

  getUserName(user: User): string {
    return this.utilService.getUserName(user);
  }
}

// ref: https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.html',
})
export class ConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}

  public confirmMessage:string;
}
