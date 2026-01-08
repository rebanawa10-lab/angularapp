import { Component } from '@angular/core';

type ProgramType = 'MSN' | 'Yahoo' | 'Google' | 'Wiki' | 'Gold' | 'Silver' | 'Bitcoin' | 'Ethereum';

@Component({
  selector: 'app-worldtoday',
  imports: [],
  templateUrl: './worldtoday.html',
  styleUrl: './worldtoday.css',
})


export class Worldtoday {
    
    // Validate + map to URLs
    openPopup(programType: ProgramType | string): void {
        const urlMap: Record<string, string> = {
            MSN: 'https://www.msn.com/',
            Yahoo: 'https://sg.yahoo.com/',
            Google: 'https://news.google.com/home?hl=en-SG&gl=SG&ceid=SG:en',
            Wiki: 'https://en.wikipedia.org/wiki/Wikipedia:On_this_day/Today',
            Gold: 'https://goldprice.today/?utm_source=chatgpt.com',
            Silver: 'https://xag.today/?utm_source=chatgpt.com',
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

}
