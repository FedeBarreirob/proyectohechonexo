import { MatPaginator, MatPaginatorIntl } from '@angular/material';

export class CustomPaginatorEspanol extends MatPaginatorIntl {
    constructor() {
        super();
        this.nextPageLabel = ' Siguiente';
        this.previousPageLabel = ' Anterior';
        this.itemsPerPageLabel = ' Cantidad por página';
    }
}