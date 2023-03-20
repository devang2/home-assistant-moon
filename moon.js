/**
 * Normalize moon phase number
 * 
 * @param {String} phase
 * 
 * @return {String}
 */
  /*
 New_moon  新月
 Waxing_crescent 新月蛾眉月
 First_quarter 上弦月
 Waxing_gibbous 盈凸月
 Full_moon 满月
 Waning_gibbous 亏凸月
 Last_quarter 下弦月
 Waning_crescent 残月蛾眉月
 今晚无月
 */
const getMoonPhase3 = (phase) => {
    switch(phase) {
        case 'new_moon':
            return  {
                //name: 'New Moon',
                name: '新月',
                link: 'https://www.timeanddate.com/astronomy/moon/new-moon.html'
            };
        case 'waxing_crescent':
            return {
                //name: 'Waxing Crescent Moon',
                name: '新月蛾眉月',
                link: 'https://www.timeanddate.com/astronomy/moon/waxing-crescent.html'
            };
        case 'first_quarter':
            return {
                //name: 'First Quarter Moon',
                name: '上弦月',
                link: 'https://www.timeanddate.com/astronomy/moon/first-quarter.html'
            };
        case 'waxing_gibbous':
            return {
                //name: 'Waxing Gibbous Moon',
                name: '盈凸月',
                link: 'https://www.timeanddate.com/astronomy/moon/waxing-gibbous.html'
            };
        case 'full_moon':
            return {
                //name: 'Full Moon',
                name: '满月',
                link: 'https://www.timeanddate.com/astronomy/moon/full-moon.html'
            };
        case 'waning_gibbous':
            return {
                //name: 'Waning Gibbous Moon',
                name: '亏凸月',
                link: 'https://www.timeanddate.com/astronomy/moon/waning-gibbous.html'
            };
        case 'last_quarter':
            return {
                //name: 'Last Quarter Moon',
                name: '下弦月',
                link: 'https://www.timeanddate.com/astronomy/moon/third-quarter.html'
            };
        case 'waning_crescent':
            return {
                //name: 'Waning Crescent Moon',
                name: '残月蛾眉月',
                link: 'https://www.timeanddate.com/astronomy/moon/waning-crescent.html'
            };
		default:
            return {
                //name: 'No Moon',
                name: '今晚无月',
                link: 'http://devang.net'
            };
    }
}

/**
 * Phases of the moon custom lovelace UI card
 */
class MoonPhasesCard3 extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            
            // Get current date
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            
            // Get current moon phase w/moon entity
            const entities = this.config.entities;
            const moonState = hass.states[entities[0]].state;
            const phase = getMoonPhase3(moonState);
            const sunState = hass.states[entities[1]].state;
            
            console.log(`Current phase - ${phase} 🌙`);
            
            // Render card
            let card = document.createElement('ha-card');
            this.content = document.createElement('div');
            this.content.style.padding = '0 16px 16px';
            card.appendChild(this.content);
            this.appendChild(card);
            
            // Styles
            let style = document.createElement("style");
            style.textContent = `
                ha-card {
                    color: #FAFAFA;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    padding: 1em 0;
                    font-weight: bold;
                }
                .title, .date {
                    font-size: 1em;
                }
                .content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 1em;
                    font-weight: bold;
                }
                .content a {
                    color: #FAFAFA;
                    text-decoration: none;
                }
                .content size_color {
                    color: #323232;
                    font-size: 2em;
                }
                .img, .name {
                    padding: 0em;
                }
            `;
            card.appendChild(style);
            
            // Toggle background based on sun above/below horizon
			// 我注释了下面这两行，不让它根据太阳升起或下山触发更改卡片背景颜色
            //const backgroundColor = (sunState === 'above_horizon' ? '#87CEFA' : '#39006c');
            //card.style['background-color'] = backgroundColor;
            const backgroundColor = '#000000';
            card.style['background-color'] = backgroundColor;
            
            // DOM
            this.content.innerHTML = `
                <div class="header">
                    <div class="title">月相🌙</div>
                    <div class="date">${year}/${month}/${day}</div>
                </div>
                <div class="content">
                    <img src="/hacsfiles/moonphases/${phase.name}.jpg" class="img">
                </div>
                <div class="content">
                    <span class="name"><a href="${phase.link}" target="_blank"><size_color>${phase.name}<size_color></a></span>
                </div>
            `;
        }
    }
    
    setConfig(config) {
        if (!config.entities) {
            throw new Error('You need to define an entity');
        }
        if (!config.entities[0].includes('moon')) {
            throw new Error('Moon entity must be included first');
        }
        this.config = config;
    }
}

customElements.define('moon-phases3', MoonPhasesCard3);
