<template>
  <v-footer color="transparent" class="text-white footer-dark" elevation="0" padless>
    <v-container class="py-8 footer-container">
      <v-row>
        <v-col cols="12" md="4">
          <RouterLink to="/">
            <v-img
              :src="footerLogoSrc"
              alt="UCHYTIL s.r.o."
              width="200"
              height="72"
              class="mb-4"
              @error="onFooterLogoError"
            />
          </RouterLink>
          <div class="footer-note">
            Stavba, Energetika, TZB.
          </div>
        </v-col>

        <v-col cols="6" md="4">
          <h6 class="footer-heading">Naše služby</h6>
          <ul class="footer-links">
            <li><RouterLink :to="{ name: 'Division', params: { division: 'energetika' } }">Energetika</RouterLink></li>
            <li><RouterLink :to="{ name: 'Division', params: { division: 'prumysl' } }">TZB</RouterLink></li>
            <li><RouterLink :to="{ name: 'Division', params: { division: 'stavebnictvi' } }">Stavba</RouterLink></li>
            <li><RouterLink :to="{ name: 'Prodejna' }">Prodejna</RouterLink></li>
          </ul>
        </v-col>

        <v-col cols="6" md="4">
          <h6 class="footer-heading">Společnost</h6>
          <ul class="footer-links">
            <li><RouterLink :to="{ name: 'AboutUs' }">O nás</RouterLink></li>
            <li><RouterLink :to="{ name: 'References' }">Reference</RouterLink></li>
            <li><RouterLink :to="{ name: 'Career' }">Kariéra</RouterLink></li>
            <li><RouterLink :to="{ name: 'ContactUs' }">Kontakt</RouterLink></li>
            <li><a href="#" @click.prevent="etickyKodexOpen = true">Etický kodex</a></li>
            <li><a href="#" @click.prevent="certifikaceOpen = true">Certifikace</a></li>
          </ul>
        </v-col>
      </v-row>

      <v-divider class="my-6" color="white" :thickness="1" style="opacity:0.16"></v-divider>

      <v-row align="center">
        <v-col cols="12" sm="6" class="text-sm-left text-center">
          <small class="text-white text-opacity-70">&copy; {{ new Date().getFullYear() }} UCHYTIL s.r.o.</small>
        </v-col>
        <v-col cols="12" sm="6" class="text-sm-right text-center">
          <div class="socials">
            <v-btn icon size="small" href="https://www.facebook.com/uchytilsro" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon size="small" href="https://www.instagram.com/uchytil_tzb_stavba_energetika" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon size="small" href="https://www.linkedin.com/company/uchytil-s-r-o-/" target="_blank" variant="text" class="mx-1" color="white"><v-icon>mdi-linkedin</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Ethical Code Modal -->
    <v-dialog v-model="etickyKodexOpen" max-width="900" scrollable>
      <v-card>
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title>Whistleblowing, Etický kodex</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="etickyKodexOpen = false"></v-btn>
        </v-toolbar>
        <v-card-text class="pa-6 text-body-1" style="max-height: 80vh;">
          <p class="mb-4">
            <strong>Vážení zaměstnanci, obchodní partneři, přátelé</strong>
          </p>
          <p class="mb-4">
            Od založení společnosti spolu s kolegy budujeme společnost, která poskytuje zákazníkům spolehlivé služby na profesionální úrovni.
            Za toto období se nám povedlo získat si důvěru stabilního okruhu zákazníků, kteří se k nám vrací.
          </p>
          <p class="mb-4">
            Důvěru a dobré jméno budujeme na tradičních hodnotách, kdy se profesionální přístup a kvalita práce snoubí s respektem k lidské práci a platným zákonům.
          </p>
          <p class="mb-6">
            Naše dobré jméno je pro nás závazkem i do budoucna, principy na kterých společnost vyrůstala, zůstávají platné. S rozvojem společnosti, vyšším počtem zaměstnanců, rolí, kterou si postupem času získáváme na trhu, vzniká potřeba se otevřeně k těmto principům přihlásit, deklarovat náš postoj v oblasti dodržování etických norem a platné legislativy vydáním etické kodexu firmy UCHYTIL s.r.o.
          </p>

          <h3 class="text-h6 font-weight-bold mb-3 text-primary">Otevřeně deklarujeme jako svoji prioritu, i do budoucna se zavazujeme:</h3>
          
          <ul class="pl-5 mb-6">
            <li class="mb-3">
              <strong>Jednat podle platných zákonů aktuálních standardů</strong><br>
              Při veškerých obchodních rozhodnutích a činnostech musí být dodržovány veškeré příslušné zákony. Řádně účtujeme veškeré ekonomické transakce, poctivě a včas odvádíme veškeré povinné platby. Dodržujeme veškeré daňové předpisy, zdržujeme se nezákonného obcházení daní či nepřípustných daňových výhod.
            </li>
            <li class="mb-3">
              <strong>Netolerovat korupci</strong><br>
              Je pro nás nepřípustné jakékoliv nabízení, slibování, poskytování či schvalování finančních nebo jiných výhod pro obchodní partnery s cílem získání výhody v rámci rozhodovacího procesu získání zakázky, či jiného fungování firmy. Pro zaměstnance je nepřípustné požadování nebo přijímání slibů či finanční nebo jiné výhody pro sebe nebo jiné osoby s cílem poskytnutí přednostního jednání.
            </li>
            <li class="mb-3">
              <strong>Hrát fair</strong><br>
              Distancujeme se od nezákonných aktivit, které omezují nebo deformují konkurenci. Veškeré obchodní činnosti musí být vedeny řádným a úplným způsobem v souladu se zákonem a vnitřními předpisy firmy.
            </li>
            <li class="mb-3">
              <strong>Dbát na bezpečnost informací a ochranu dat</strong><br>
              S informacemi nakládáme opatrně, chráníme obchodní tajemství naší firmy i důvěrné informace zaměstnanců i třetích stran.
            </li>
             <li class="mb-3">
              <strong>Dodržovat standardy týkající se bezpečnosti a ochrany zdraví</strong><br>
              Ochrana zdraví našich zaměstnanců je pro nás prioritou.
            </li>
            <li class="mb-3">
              <strong>Nepodporovat praní špinavých peněz</strong><br>
              Společnost udržuje kontakty a obchodní aktivity jen s respektovanými obchodními partnery, jejichž podnikatelské aktivity se řídí veškerými příslušnými zákony a jejichž finanční prostředky pochází ze zákonných aktivit.
            </li>
            <li class="mb-3">
              <strong>Netolerovat diskriminaci</strong><br>
              Ve společnosti dodržujeme lidská práva všech zaměstnanců, jednáme navzájem s úctou a respektem. Zaměstnancům, uchazečům o zaměstnání a obchodním partnerům zajišťujeme rovné zacházení a rovné příležitosti. Mzdy a výhody zaměstnanců, smluvní ceny subdodavatelů jsou spravedlivé a v souladu s platnými právními předpisy i se smluvními ujednáními. Žádný zaměstnanec ani obchodní partner nesmí být přímo nebo nepřímo diskriminován, sexuálně obtěžován, nebo jakkoli znevažován.
            </li>
            <li class="mb-3">
              <strong>Vyhýbat se střetu zájmů</strong><br>
              Prosazujeme pracovně právní vztahy, které zaručí, že osobní zájmy zaměstnanců nedovolí ovlivňovat jejich pracovní rozhodování, které by mohlo být ve střetu se zájmy firmy.
            </li>
            <li class="mb-3">
              <strong>Nakládat s majetkem firmy dle pravidel</strong><br>
              Zaměstnanci jsou povinni zacházet s majetkem firmy účelně, nesmí využívat majetek firmy ani její služby nedovoleným způsobem.
            </li>
            <li class="mb-3">
              <strong>Ctít společenskou odpovědnosti vůči občanům a celé ČR</strong><br>
              Jsme si vědomi dopadů našich podnikatelských aktivit na životní prostředí a zavazujeme se chránit půdu, vodu, ovzduší, biologickou diverzitu a kulturní dědictví, chováme se odpovědně vůči budoucím generacím.
            </li>
          </ul>

          <v-divider class="my-6"></v-divider>

          <p class="mb-4">
            Etický kodex shrnuje zásadní zákonná a etická pravidla. Je zcela nezbytné, aby tyto pravidla byly nedílnou součástí firemní kultury naší společnosti. Za jejich dodržování je odpovědný každý zaměstnanec, od vedoucích pracovníků se očekává, že nejen zprostředkují jejich význam a obsah zaměstnancům, budou dbát na to, aby je zaměstnanci plnili, kontrolovat jejich plnění, ale sami budou v plnění příkladem.
          </p>
          <p class="mb-4">
            Zaměstnanci jsou v prosazování jednání dle etického kodexu podporování vedením společnosti.
          </p>
          <p class="mb-6">
            Žádný zaměstnanec, ani obchodní partner nebude znevýhodněn v důsledku jednání v souladu se zákonem nebo zásadami uvedenými v tomto etickém kodexu firmy UCHYTIL s.r.o.
          </p>

          <h3 class="text-h6 font-weight-bold mb-3 text-primary">Whistleblowing - Ochrana oznamovatelů</h3>
          <p class="mb-4">
            Otázky a podněty týkající se etického kodexu mohou zasílat zaměstnanci i obchodní partneři.
          </p>
          <p class="mb-4">
            Pokud se zaměstnanec, či obchodní partner v konkrétním případě domnívá, že byl porušen etický kodex, nebo že se v naší společnosti děje cokoli v rozporu s platnou legislativou má možnost o tom v souladu se zákonem o ochraně oznamovatelů (WHISTLEBLOWING) informovat vedení společnosti:
          </p>

          <v-list density="compact" bg-color="grey-lighten-4" class="rounded-lg mb-4">
            <v-list-item prepend-icon="mdi-email">
              <v-list-item-title>E-mail</v-list-item-title>
              <v-list-item-subtitle><a href="mailto:jednameeticky@uchytil.eu">jednameeticky@uchytil.eu</a></v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-mailbox">
              <v-list-item-title>Poštou / Schránka</v-list-item-title>
              <v-list-item-subtitle>
                 Podat podnět prostřednictvím poštovní schránky, která je umístěna u vchodu do sídla firmy.<br>
                 Adresa: <strong>K terminálu 7, 61900 Brno</strong><br>
                 Oznámení viditelně označte heslem <strong>„WHISTLEBLOWING“</strong>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <p class="text-caption text-medium-emphasis">
            Abychom mohli oznámení řešit, je třeba, aby obsahovalo údaje o totožnosti oznamovatele, tj. nemůže být anonymní.
          </p>

        </v-card-text>
        <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="primary" @click="etickyKodexOpen = false">Zavřít</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Certifications Modal -->
    <v-dialog v-model="certifikaceOpen" max-width="800">
      <v-card>
        <v-toolbar color="primary" density="compact">
          <v-toolbar-title>Certifikace</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="certifikaceOpen = false"></v-btn>
        </v-toolbar>
        <v-card-text class="pa-6 text-body-1">
          <p class="mb-4">
            Firma zavedla a používá integrovaný systém řízení, který odpovídá 
            <strong>ČSN EN ISO 9001:2016, ČSN EN ISO 14001:2016, ČSN ISO 45001:2018</strong>, politika společnosti.
          </p>
          <p class="mb-4">
            Společnost je certifikována pro výrobu a montáž, opravy a rekonstrukce energetických zařízení 
            a ocelových konstrukcí dle normy <strong>ČSN EN ISO 3834-2:2022</strong>, pro výrobu a montáž 
            ocelových konstrukcí energetických zařízení a staveb dle normy <strong>ČSN EN 1090-2+A1:2024</strong>.
          </p>
          <p class="mb-0">
            Společnost je certifikována pro výkon společných činností v plynárenství ČR firmou <strong>GAS s.r.o.</strong>
          </p>
        </v-card-text>
        <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="primary" @click="certifikaceOpen = false">Zavřít</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const footerLogoErrored = ref(false)
const footerLogoSrc = computed(() => footerLogoErrored.value ? '/fotky/logo.png' : '/fotky/logo.png')
const onFooterLogoError = () => { footerLogoErrored.value = true }
const etickyKodexOpen = ref(false)
const certifikaceOpen = ref(false)
</script>

<style scoped>
.footer-dark {
  background-color: #0b1220 !important; /* ensure override over Vuetify theme surface */
  background-image: none !important;
  border-top: none !important;
}

.footer-container {
  width: 75%;
  max-width: 1800px;
  margin: 0 auto;
}

.footer-heading {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 8px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin: 6px 0;
}

.footer-links a {
  color: white;
  text-decoration: none;
}

.footer-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.footer-note {
  color: rgba(255,255,255,0.8);
  max-width: 520px;
}

@media (max-width: 1280px) {
  .footer-container { width: 92%; }
}

@media (max-width: 960px) {
  .footer-container { width: 100%; }
}
</style>