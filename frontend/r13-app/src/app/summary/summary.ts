import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { DataService } from '../services/data';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css']
})
export class SummaryComponent implements OnInit, AfterViewInit {
  private chart: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.dataService.getChart1Data().subscribe({
      next: (data) => {
        const labels = data.map((item: any) => item.label);
        const values = data.map((item: any) => item.value);

        const ctx = document.getElementById('chart1') as HTMLCanvasElement;
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Capacity (MW)',
              data: values,
              backgroundColor: [
                'rgba(52, 152, 219, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(241, 196, 15, 0.7)'
              ],
              borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(241, 196, 15, 1)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Capacity (MW)'
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top'
              },
              title: {
                display: true,
                text: 'Hydropower Project Capacity Comparison'
              }
            }
          }
        });
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
