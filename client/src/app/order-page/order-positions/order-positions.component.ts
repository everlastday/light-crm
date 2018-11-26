import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PositionsService} from "../../shared/services/positions.service";
import {Observable} from "rxjs/index";
import {Position} from "../../shared/interfaces";
import {switchMap, map} from "rxjs/operators";
import {OrderService} from "../order.service";

@Component({
    selector: 'app-order-positions',
    templateUrl: './order-positions.component.html',
    styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

    positions$: Observable<Position[]>

    constructor(private route: ActivatedRoute, private positionService: PositionsService, private orderService: OrderService) {
    }

    ngOnInit() {
        this.positions$ = this.route.params
            .pipe(
                switchMap((params: Params) => {
                        return this.positionService.fetch(params['id']);
                    }
                ),
                map(
                    (positions: Position[]) => {
                        return positions.map(position => {
                            position.quantity = 1;
                            return position;
                        })
                    }
                )
            )
    }

    addToOrder(position: Position) {
        console.log(position);
        this.order.add(position);
    }

}
