import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.css']
})
export class AvatarEditorComponent implements OnInit {

  @Input()
  avatar: string;

  @Output()
  avatarChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  indicadorCambiarFotoDebajo: boolean = false;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  // funcion encargada de seleccionar un avatar
  onSelectAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      if (this.esValidoAvatar(event.target.files[0])) {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          this.avatar = reader.result.toString();
          this.avatarChange.emit(this.avatar);
        }
      } else {
        this.openSnackBar("Seleccione un avatar tipo jpg y tamaño menor a 100kb.");
      }
    }
  }

  // funcion que valida si el avatar es valido tanto en tamano y tipo
  private esValidoAvatar(fileAvatar: any): boolean {
    if (fileAvatar) {

      // si la no es imagen error
      if (fileAvatar.type != 'image/jpeg') {
        return false;
      }

      // si la imagen supera los 100Kb error
      if (fileAvatar.size > 512000) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
