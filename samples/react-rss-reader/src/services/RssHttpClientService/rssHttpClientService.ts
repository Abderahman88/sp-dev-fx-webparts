/* based on MSGraph class by Mikael Svenson:
https://www.techmikael.com/2018/09/example-of-wrapper-to-ease-usage-of.html
*/

import { WebPartContext } from                             '@microsoft/sp-webpart-base';
import {
  HttpClient,
  HttpClientResponse,
  IHttpClientOptions
} from                                                     '@microsoft/sp-http';

export class RssHttpClientService {

  private static _httpClient: HttpClient;

  /*
  initialize the static class
  */
  public static async init(context: WebPartContext) {

    //obtain the httpClient from the webpart context
    this._httpClient = await context.httpClient;

  }

  /*
  given a url, make a get request to a given url, expecting json in response
  Will assume response is only text and will be returned as such
  */

  public static async getRssJson(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any> {

    var p = new Promise<string>(async (resolve, reject) => {

      let requestHeaders = new Headers();

      //if Cors is disabled, then we must send a simple Accept type
      if (!disableCors) {
        requestHeaders.append('Accept', 'application/json');
      }
      else {
        requestHeaders.append('Accept', 'text/plain');
      }

      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: !disableCors ? "cors" : "no-cors"
      };

      let query = this._httpClient.fetch(
        corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : url,
        HttpClient.configurations.v1,
        requestGetOptions)
          .then((response: HttpClientResponse) : Promise<any> => {

            //get the response based on expected type
            if (!disableCors) {
              return response.json();
            }
            else {
              return response.text();
            }

          })
          .then((data: any) : void => {

            if (!disableCors) {

              resolve(data);

            }
            else {

              //expected response is actually json, thus attempt to parse response into json
              resolve(JSON.parse(data));

            }
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
    });

    return p;
  }

  /*
  given a url, make a get request to a given url
  Will assume response is only text and will be returned as such
  */
  public static async getRssXml(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any> {

    var p = new Promise<string>(async (resolve, reject) => {

      let requestHeaders = new Headers();
      requestHeaders.append('Accept', 'text/xml; application/xml');

      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: !disableCors ? "cors" : "no-cors"
      };
      debugger;
      let query = this._httpClient.fetch(
        corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : "https://cors-anywhere.herokuapp.com/https://www.standaard.be/rss/section/1f2838d4-99ea-49f0-9102-138784c7ea7c",
        HttpClient.configurations.v1,
        requestGetOptions)
          .then((response: HttpClientResponse) : Promise<any> => {

            return response.text();

          })
          .then((data: any) : void => {
            //const xml = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><title>De Standaard : Binnenland</title><link>https://www.standaard.be/nieuws/binnenland</link><description>De Standaard : Binnenland</description><language>nl-BE</language><lastBuildDate>Mon, 05 Jul 2021 21:47:06 +0200</lastBuildDate><image><url>https://static.standaard.be/extra/assets/img/logo-ds-rss.gif</url><title>De Standaard : Binnenland</title><link>https://www.standaard.be/nieuws/binnenland</link></image><ttl>2</ttl><pubDate>Mon, 05 Jul 2021 21:47:06 GMT</pubDate><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_96962930</guid><link>https://www.standaard.be/cnt/dmf20210705_96962930</link><title>Comité I stelt ook politiek voor verantwoordelijkheid bij Adiv</title><description>&lt;P>Ofwel gaan er meer middelen naar de militaire inlichtingendienst, ofwel moet die worden afgebouwd, schrijft het Comité I in zijn rapport naar aanleiding van de zaak-Conings. Dat somt ook nog eens de lange lijst gebreken op.&lt;/P></description><pubDate>Mon, 05 Jul 2021 21:33:50 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/4f48df60-ddc1-11eb-af06-b4328e192ecb_web_scale_0.0888889_0.0888889__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_96964833</guid><link>https://www.standaard.be/cnt/dmf20210705_96964833</link><title>Sympathisanten bezetten gebouw van de UGent voor sans-papiers</title><description>&lt;P>In Gent voeren een dertigtal sympathisanten actie aan de UGent. Ze richten zich tot de Gentse rector Rik Van de Walle, en vragen dat hij zich uitspreekt voor een collectieve regularisering. Tot dan zouden ze de gebouwen niet willen verlaten, zo meldt persagentschap &lt;I>Belga&lt;/I>.&lt;/P></description><pubDate>Mon, 05 Jul 2021 21:04:57 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/1149dc2a-ddc4-11eb-a47b-f72d782b565c_web_scale_0.0888889_0.0888889__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_96053728</guid><link>https://www.standaard.be/cnt/dmf20210705_96053728</link><title>Voor het eerst twee kraanvogels geboren in België</title><description>&lt;P>In ons land zijn dit jaar voor het eerst twee kraanvogels geboren. Dat gebeurde op 30 april in de Vallei van de Zwarte Beek in Limburg. De precieze nestlocatie van de kraanvogels wordt geheimgehouden. Een speciaal opgerichte kraanvogelwacht zal erop toezien dat de dieren niet gestoord worden.&lt;/P></description><pubDate>Mon, 05 Jul 2021 18:48:40 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/4e6db67c-dd9b-11eb-a47b-f72d782b565c_web_scale_0.3814286_0.3814286__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_95156108</guid><link>https://www.standaard.be/cnt/dmf20210705_95156108</link><title>Zoekactie naar Jürgen Conings heeft Defensie in totaal bijna 870.000 euro gekost</title><description>&lt;P>De zoekactie naar de vermiste militair Jürgen Conings heeft Defensie in totaal 867.045 euro gekost, zo heeft minister van Defensie Ludivine Dedonder (PS) bekendgemaakt in de Kamercommissie Defensie, waar ook het rapport van Comité I werd besproken.&lt;/P></description><pubDate>Mon, 05 Jul 2021 18:29:09 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/fc86f18a-dd94-11eb-a47b-f72d782b565c_web_scale_0.0993049_0.0993049__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_95211596</guid><link>https://www.standaard.be/cnt/dmf20210705_95211596</link><title>Brussel zet vaccinatiebus in, maar motor sputtert: 70 procent vaccinatiegraad onhaalbaar tegen midden juli</title><description>&lt;P>Volgens de huidige prognoses wordt het een onmogelijke opdracht om in Brussel 70 procent van de Brusselse volwassen bevolking een eerste prik te geven tegen midden juli. Ook in de zorginstellingen hinkt de vaccinatiegraad achterop. De Gemeenschappelijke Gemeenschapscommissie (GGC) probeert de vaccinatiegraad met verschillende initiatieven te verhogen.&lt;/P></description><pubDate>Mon, 05 Jul 2021 16:28:21 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/34de1776-d01f-11eb-b4be-e2798f97260f_web_scale_0.0875657_0.0875657__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_94964232</guid><link>https://www.standaard.be/cnt/dmf20210705_94964232</link><title>Smurfen in ere hersteld in Brussel na schade door waterlek</title><description>&lt;P>Aan het Centraal station in Brussel is de striptekening van de smurfen hersteld. Het werk was beschadigd geraakt na een waterlek, maar nu zijn alle 76 smurfen opnieuw te bewonderen op de tekening. &lt;/P></description><pubDate>Mon, 05 Jul 2021 15:39:31 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/daeaf560-73d6-11e8-9f70-64411cea0bab_web_scale_0.0811688_0.0811688__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_94523884</guid><link>https://www.standaard.be/cnt/dmf20210705_94523884</link><title>Agent in burger herkend op straat en in elkaar geslagen: twee twintigers aangehouden</title><description>&lt;P>Twee twintigers uit Herentals hebben zondagochtend rond 1.30u een politieman van de zone Neteland in elkaar geslagen. Het slachtoffer ligt in het ziekenhuis en is voor meerdere weken werkonbekwaam. De verdachten zijn geen onbekenden voor het gerecht. Ze hadden eerder op de avond al amok gemaakt in een zomerbar. &lt;/P></description><pubDate>Mon, 05 Jul 2021 14:20:45 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/e1203974-dcdb-11eb-80fc-8a9e353d7ec7_web_translate_0_0__scale_0.4370915_0.4370915__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_94503868</guid><link>https://www.standaard.be/cnt/dmf20210705_94503868</link><title>Een toevloed aan slakken in de tuin? Dit kunt u ertegen doen</title><description>&lt;P>Opgepeuzelde planten, slijmsporen rond het huis … De laatste dagen lijken er massaal veel slakken in onze tuinen op te duiken. ‘Normaal voor deze tijd van het jaar, en zeker na de zware regenval van de afgelopen dagen’, zegt bioloog en slakkenkenner Thierry Backeljau.&lt;/P></description><pubDate>Mon, 05 Jul 2021 14:30:23 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/09dabe4a-d83e-11eb-8f3c-1da22e2106bf_web_scale_0.3708333_0.3708333__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_93476709</guid><link>https://www.standaard.be/cnt/dmf20210705_93476709</link><title>Wateroverlast en droogte: keerzijde van dezelfde medaille</title><description>&lt;P>Vorige zomers kreunde ons land onder de hitte. Er werd alom alarm geslagen over de droogte. Het is te vroeg om uitspraken te doen over de volledige zomer, maar dat u de voorbije weken nattigheid gevoeld hebt, is zeker. ‘Beide zijn het gevolg van de minder actieve straalstroom’, legt weerman David Dehenauw uit.&lt;/P></description><pubDate>Mon, 05 Jul 2021 11:36:42 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/52f98b00-dcef-11eb-80fc-8a9e353d7ec7_web_scale_0.2083333_0.2083333__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_93684056</guid><link>https://www.standaard.be/cnt/dmf20210705_93684056</link><title>Innovatieve kankermedicijnen: peperduur, royaal terugbetaald, maar nut niet bewezen</title><description>&lt;P>De Belgische ziekteverzekering betaalt heel wat innovatieve kankermedicijnen terug, zonder dat die de levensduur van kankerpatiënten optrekken. Dat concluderen onderzoekers van het Kenniscentrum voor de Gezondheidszorg. &lt;/P></description><pubDate>Mon, 05 Jul 2021 12:12:19 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/89d1facc-dd76-11eb-af06-b4328e192ecb_web_scale_0.3231686_0.3231686__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_93224416</guid><link>https://www.standaard.be/cnt/dmf20210705_93224416</link><title>Asiel en Migratie zoekt 700 personeelsleden</title><description>&lt;P>De asiel- en migratiediensten gaan de komende maanden op zoek naar 700 bijkomende werknemers. In een eerste reeks gaat het volgens staatssecretaris voor Asiel en Migratie Sammy Mahdi (CD&amp;V) vooral om veiligheidsbegeleiders, migration en protection officers en terugkeerbegeleiders.&lt;/P></description><pubDate>Mon, 05 Jul 2021 09:06:55 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/c6f65d44-dd62-11eb-af06-b4328e192ecb_web_scale_0.0771605_0.0771605__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_93013936</guid><link>https://www.standaard.be/cnt/dmf20210705_93013936</link><title>Hulpdiensten Itter zoeken in riolering naar meegesleurde man </title><description>&lt;P>Een man is uit Itter zondagavond tijdens de heftige regenval meegesleurd in een beek. De hulpdiensten zoeken momenteel nog in de riolering naar de man. Dat meldt de hulpverleningszone Waals-Brabant maandag.&lt;/P></description><pubDate>Mon, 05 Jul 2021 10:12:18 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/15c8efe2-dd75-11eb-af06-b4328e192ecb_web_scale_0.2083333_0.2083333__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_92873294</guid><link>https://www.standaard.be/cnt/dmf20210705_92873294</link><title>Na fietsen door het water en de bomen, nu ook fietsen door de heide</title><description>&lt;P>Na ‘Fietsen door het water’ en ‘Fietsen door de bomen’, heeft de provincie Limburg een nieuwe trekpleister klaar. ‘Fietsen door de heide’ is een belevingsroute van 4 kilometer in Maasmechelen. Het traject gaat dwars door het Nationaal Park Hoge Kempen met een 300 meter lange fietssteiger. &lt;/P></description><pubDate>Mon, 05 Jul 2021 09:53:20 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/6e9aa5a2-dd66-11eb-a47b-f72d782b565c_web_scale_0.4166667_0.4166667__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_92061538</guid><link>https://www.standaard.be/cnt/dmf20210705_92061538</link><title>Appartementsgebouw al na zes jaar onbewoonbaar: ‘Structuur helemaal rot’</title><description>&lt;P>Vijfentwintig gezinnen uit een nagelnieuw appartementsgebouw in Sint-Truiden moeten plots een nieuw onderkomen zoeken, omdat hun gebouw onbewoonbaar is verklaard. Het moderne gebouw werd opgetrokken in houtmassiefbouw, en na amper zes jaar blijkt de structuur rot. Een ramp voor de bewoners. ‘En nochtans, we hebben het allemaal zien aankomen.’&lt;/P></description><pubDate>Mon, 05 Jul 2021 07:39:07 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/57c48ebe-dd53-11eb-af06-b4328e192ecb_web_scale_0.5738881_0.5738881__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210705_91718111</guid><link>https://www.standaard.be/cnt/dmf20210705_91718111</link><title>Zomerweer laat op zich wachten</title><description>&lt;P>De nieuwe week start opnieuw met weer dat niet aan de zomer doet denken. Het is weer uitkijken voor lokaal onweer, zegt het KMI. Dinsdag komt er ook nog eens een stevige wind bij.&lt;/P></description><pubDate>Mon, 05 Jul 2021 06:42:12 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/db752fc2-dc7f-11eb-80fc-8a9e353d7ec7_web_scale_0.0877193_0.0877193__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20200629_05004008</guid><link>https://www.standaard.be/cnt/dmf20200629_05004008</link><title>Coronablog | Italië kleurt opnieuw helemaal groen op coronakaart</title><description>&lt;P>Volg hier alle recente ontwikkelingen over de coronacrisis.&lt;/P></description><pubDate>Mon, 05 Jul 2021 21:36:38 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/789191e6-ddb7-11eb-a47b-f72d782b565c_web_scale_0.068918_0.068918__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210701_91877622</guid><link>https://www.standaard.be/cnt/dmf20210701_91877622</link><title>Cartoon van de dag - juli 2021</title><description>&lt;P>Elke dag brengt De Standaard nieuwe cartoons van huiscartoonist Lectrr.&lt;/P></description><pubDate>Mon, 05 Jul 2021 06:40:12 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/f66e1eb2-dd4a-11eb-af06-b4328e192ecb_web_scale_0.1058201_0.1058201__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210704_97458690</guid><link>https://www.standaard.be/cnt/dmf20210704_97458690</link><title> Deltavariant in opmars: komt er een vierde golf aan?</title><description>&lt;p>Nu de zomervakantie is afgetrapt, maken velen zich klaar om straks op reis te vertrekken naar het buitenland. Sommigen zijn er misschien al. Dreigt de deltavariant de zomereuforie te temperen?&lt;/p></description><pubDate>Mon, 05 Jul 2021 03:25:00 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/05/87d66712-dcf4-11eb-9a34-7a5dc4737838.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210704_96074961</guid><link>https://www.standaard.be/cnt/dmf20210704_96074961</link><title>Vlaanderen klaar om alle 12- tot en met 15-jarigen in zomermaanden te vaccineren</title><description>&lt;P>Vlaanderen wil de jongeren tegen de start van het nieuwe schooljaar op zijn minst al een eerste prik geven. De regering wacht alleen nog op interfederaal groen licht. &lt;/P>&lt;P>&lt;/P></description><pubDate>Sun, 04 Jul 2021 20:30:35 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/04/8154d846-dcdc-11eb-9a34-7a5dc4737838_web_scale_0.0811688_0.0811688__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210704_94032340</guid><link>https://www.standaard.be/cnt/dmf20210704_94032340</link><title>Betoging tegen PFOS-vervuiling: ‘Boeren verdienen schadevergoeding’</title><description>&lt;P>420 manifestanten hielden zondagmiddag in Antwerpen een mars voor een beter klimaatbeleid. De mars lokte 420 manifestanten. ‘Boeren moeten vergoed worden voor de verliezen die ze lijden door de grondvervuiling’, zegt Tijs Boelens van Boerenforum.&lt;/P></description><pubDate>Sun, 04 Jul 2021 15:24:04 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/04/2e36c6fc-dcb8-11eb-9a34-7a5dc4737838_web_scale_0.0771605_0.0771605__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20200813_95673410</guid><link>https://www.standaard.be/cnt/dmf20200813_95673410</link><title>Moet je stekkers uittrekken, mag je douchen en andere vragen over onweer</title><description>&lt;P>Hoe hou je het veilig tijdens een onweer? Mag je je paraplu openen? Hoe dodelijk is een blikseminslag? En moet je je stekkers uittrekken? Laurent Delobbe en Dieter Poelman, bliksemspecialisten van het KMI, en elektricien Peter Dossche geven uitleg.&lt;/P></description><pubDate>Sun, 04 Jul 2021 14:11:00 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2020/08/16/45a358c2-dc6f-11ea-9fde-d2df680ca95d_web_scale_0.1128987_0.1128987__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210704_93619913</guid><link>https://www.standaard.be/cnt/dmf20210704_93619913</link><title>Twee vrouwen doodgevroren in Alpen</title><description>&lt;P>In de Alpen zijn twee vrouwen doodgevroren op een hoogte van meer dan 4.000 meter aan de Italiaans-Zwitserse grens. Dat melden reddingswerkers uit de kleine regio Valle d’Aosta in het noordwesten van Italië.&lt;/P></description><pubDate>Sun, 04 Jul 2021 12:02:32 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/04/a9a6b856-dcae-11eb-9a34-7a5dc4737838_web_scale_0.0694444_0.0694444__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210704_93437573</guid><link>https://www.standaard.be/cnt/dmf20210704_93437573</link><title>Overheid waarschuwt na grote cyberaanval: ‘Schakel deze software meteen uit’</title><description>&lt;P>De Belgische cyberwaakhond Cert roept bedrijven op om één bepaald software programma meteen uit te schakelen, na een grootschalige internationale cyberaanval. Enkele notoire Russische hackers zijn erin geslaagd om via deze software binnen te dringen in de computersystemen van nu al minstens 200 bedrijven. Hun computers zijn gegijzeld, en de hackers eisen tot vijf miljoen dollar losgeld. &lt;/P></description><pubDate>Sun, 04 Jul 2021 11:32:20 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/04/15336a7a-dca9-11eb-9a34-7a5dc4737838_web_scale_0.1142857_0.1142857__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210703_95775888</guid><link>https://www.standaard.be/cnt/dmf20210703_95775888</link><title>Europees plasticverbod gaat in: vaarwel wattenstaafjes en rietjes</title><description>&lt;P>De Europese richtlijn die zogenaamde ‘single use plastics’ verbiedt, treedt vanaf dit weekend in werking. Winkels mogen geen plastic wegwerpbekers, bestek, borden, rietjes en roerstaafjes meer verkopen. &lt;/P></description><pubDate>Sat, 03 Jul 2021 18:02:25 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/03/a0227102-dc14-11eb-bdb3-1cec43380153_web_scale_0.2031488_0.2031488__.jpg" type="image/jpeg"/></item><item><guid isPermaLink="true">https://www.standaard.be/cnt/dmf20210702_95973118</guid><link>https://www.standaard.be/cnt/dmf20210702_95973118</link><title>België ligt in de tornado alley van Europa: moeten we ons daar zorgen om maken?</title><description>&lt;P>In juni zijn er heel wat tornado’s over Europese continent geraasd. In Tsjechië kwamen daarbij 5 mensen om het leven, en in ons land scheurden daken van de huizen. België ligt in de ‘tornado alley’ van Europa, een gebied waar het frequentst windhozen voorkomen. Welke risico’s zijn daaraan verbonden, en moeten we ons zorgen maken? In bovenstaande video legt meteoroloog David Dehenauw het uit. &lt;/P></description><pubDate>Sat, 03 Jul 2021 10:20:04 +0200</pubDate><enclosure url="https://static.standaard.be/Assets/Images_Upload/2021/07/03/06379b56-db53-11eb-b8f3-6cfd9c88a9de_web_scale_0.081367_0.081367__.jpg" type="image/jpeg"/></item></channel></rss>'
            //resolve(xml);
            resolve(data);

          })
          .catch(error => {
            reject(error);
          });
    });
    return p;
  }

  /*
  given a feed url and the proxy url, replace proxy url token(s)
  {0} will be replaced with url
  */
  private static processCorsProxyUrl(url: string, corsProxyUrl: string) : string {
    if (!url || !corsProxyUrl) {
      return "";
    }

    //replace {0} with the feed Url
    return corsProxyUrl.replace(/\{0\}/ig, url);
  }
}
