import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-analytics-page',
    templateUrl: './analytics-page.component.html',
    styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

    @ViewChild('gain') gainRef: ElementRef;
    @ViewChild('order') orderRef: ElementRef;

    aSub: Subscription;
    average: number;
    pending = true;

    constructor(private service: AnalyticsService) {
    }

    ngAfterViewInit(): void {
        this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
            this.average = data.average;
            this.pending = false;
        });
    }

    ngOnDestroy(): void {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }

    }

}
