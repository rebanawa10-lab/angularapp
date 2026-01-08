import { Component, OnInit } from '@angular/core';

// Standard version
type ProgramType = 'MSN' | 'Yahoo' | 'Google' | 'Wiki' | 'Gold' | 'Silver' | 'SGDRate' | 'Bitcoin' | 'Ethereum';


// mat-tree-node version
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  action?: string; // optional, stores what openPopup should receive
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  action?: string;
}

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // 


@Component({
  selector: 'app-worldtoday',
  imports: [
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    CommonModule, 

  ],
  templateUrl: './worldtoday.html',
  styleUrl: './worldtoday.css',
})


export class Worldtoday implements OnInit {
    
  // Standard version
  // Validate + map to URLs
    openPopupV1(programType: ProgramType | string): void {
        const urlMap: Record<string, string> = {
            MSN: 'https://www.msn.com/',
            Yahoo: 'https://sg.yahoo.com/',
            Google: 'https://news.google.com/home?hl=en-SG&gl=SG&ceid=SG:en',
            Wiki: 'https://en.wikipedia.org/wiki/Wikipedia:On_this_day/Today',
            Gold: 'https://goldprice.today/?utm_source=chatgpt.com',
            Silver: 'https://xag.today/?utm_source=chatgpt.com',
            SGDRate: 'https://www.indexmundi.com/xrates/table.aspx?c1=SGD&utm_source=chatgpt.com',           
            Bitcoin: 'https://coinmarketcap.com/currencies/bitcoin/',
            Ethereum: 'https://coinmarketcap.com/currencies/ethereum/',
        };

        if (!(programType in urlMap)) {
          alert(`Invalid program: ${programType}`);
          return;
        }

        this.openWindow(urlMap[programType]);
    }

    private openWindow(url: string): void {
          const width = 1100;
          const height = 750;

          const left = Math.max(0, (window.screen.width - width) / 2);
          const top = Math.max(0, (window.screen.height - height) / 2);

          window.open(
            url,
            '_blank',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
          );
    }


  // mat-tree-node version
  urlMap: { [key: string]: string } = {
      'Yahoo': 'https://sg.yahoo.com/',
      'Google': 'https://news.google.com/home?hl=en-SG&gl=SG&ceid=SG:en',
      'MSN': 'https://www.msn.com',
      'Wiki': 'https://en.wikipedia.org/wiki/Wikipedia:On_this_day/Today',
      'Gold': 'https://goldprice.today/?utm_source=chatgpt.com',
      'Silver': 'https://xag.today/?utm_source=chatgpt.com',
      'SGDRate': 'https://www.indexmundi.com/xrates/table.aspx?c1=SGD&utm_source=chatgpt.com',
      'Bitcoin': 'https://coinmarketcap.com/currencies/bitcoin/',
      'Ethereum': 'https://coinmarketcap.com/currencies/ethereum/'
  };


  // Define the hierarchical data
  treeData: TreeNode[] = [
    {
      name: 'Search Engines',
      children: [
        { name: 'Yahoo', action: 'Yahoo' },
        { name: 'Google', action: 'Google' },
        { name: 'MSN', action: 'MSN' },
        { name: 'Wikipedia', action: 'Wiki' },
      ]
    },
    {
      name: 'Earth Minerals',
      children: [
        { name: 'Gold', action: 'Gold' },
        { name: 'Silver', action: 'Silver' },
      ]
    },
    {
      name: 'Currency & Crypto',
      children: [
        { name: 'SGD rate', action: 'SGDRate' },
        { name: 'Bitcoin', action: 'Bitcoin' },
        { name: 'Ethereum', action: 'Ethereum' },
      ]
    }
  ];

  ngOnInit() {
    // Expand all nodes by default
    this.treeControl.dataNodes.forEach(node => {
      if (node.expandable) {
        this.treeControl.expand(node);
      }
    });
  }

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      action: node.action
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, FlatNode>(
  this.transformer,
  (node: FlatNode) => node.level,
  (node: FlatNode) => node.expandable,
  (node: TreeNode) => node.children
);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  openPopup(action: string) {
      const url = this.urlMap[action];
      if (url) {   
        this.openWindow(url);   // Standard version / mat-tree-node version
      } else {
        console.warn('No URL mapped for action:', action);
      }
  }




}
