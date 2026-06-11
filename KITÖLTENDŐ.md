# KITÖLTENDŐ — valós adatok listája

A jelenlegi 9 szekciós oldal összes helyőrzője (`[...]`). Minden helyőrző valós adatot vár.
Amíg üres, a kapcsolódó elemen narancssárga **„Kitöltendő"** jelölő látszik.

**Igazság-szabály:** semmi kitalált adat — csak valós szám, idézet, logó, projekt.
Amit nem tudsz alátámasztani, hagyd ki (a legtöbb elem törölhető a layout törése nélkül).

Oldalszerkezet: Hero → Social proof → Galéria → Miért én → Iparágak → Eredmények → Ár → Folyamat → Kapcsolat.

---

## 1. Hero alatti social proof (`HeroSocialProof.tsx`) — KIKAPCSOLVA
- `ENABLED = false` → a sáv **nem jelenik meg**, amíg nincs valós tartalom.
- Bekapcsoláshoz: `ENABLED = true`, majd `[rövid vélemény]`, `[Név, vállalkozás]`.

## 2. Galéria — kiemelt Aurum kártya (`data/projects.ts` → `aurum-bistro.caseStudy`)
A nagy, kiemelt kártya esettanulmány-szövege:
- `[MI VOLT A PROBLÉMA …]` (Kihívás)
- `[MIT ÉPÍTETTEM …]` (Megoldás)
- `[KONKRÉT EREDMÉNY …]` (Eredmény)
- **Eltávolítható:** ha nincs még valós sztori, töröld a `caseStudy` blokkot — a kártya enélkül is megjelenik.

## 3. Galéria — placeholder projektek (`data/projects.ts`)
**Valós, kész:** Aurum Bistro (étterem) + Luma Boutique Hotel (hotel) — 2 vendéglátós példa.
**Üres slotok** (más iparágak, mind `comingSoon: true`):
- Szolgáltatás / Webshop / Szépségipar / Egészségügy — mindegyik: `[Projekt címe]`, alcím, leírás, `[Cél]`, `[Mit javít]`, `[Címke]`-k
- **Eltávolítható:** bármelyik placeholder projekt törölhető a tömbből.

## 4. Iparág-fülek (`data/content.ts` → `industries`)
A „Vendéglátás" fül kész. A másik 4 fül bracketelt (a nem-vendéglátás füleken „Koncepció / hamarosan" jelző látszik):
- **Szolgáltatás / Webshop / Szépségipar / Egészségügy** — mindegyik: `[Egymondatos állítás …]`, `[Rövid bekezdés …]`, 4 × `[Fókuszpont]` + `[Rövid leírás]`

## 5. Eredmények sáv (`ResultsStrip.tsx`)
- 4 szám: `[+X%]` több megkeresés · `[2.1s → 0.9s]` betöltés · `[X]+` elkészült weboldal · `[X] nap` átadás
- Mindegyik alatt forrás-slot: `[mérés forrása / projekt neve]`
- `[iparágak / projektek]` — a 3. tile sublabel-je
- Count-up animáció: adj `countTarget: <szám>` mezőt (lásd komment a fájlban)
- Reprezentatív jelölés: `SHOW_REPRESENTATIVE_NOTE = true` → megjelenik a `[* Reprezentatív / korábbi projekt adatai]` lábjegyzet
- **Eltávolítható:** bármelyik tile törölhető (grid 1–4-ig jól néz ki)

## 6. Ár blokk (`OfferBlock.tsx`)
- `[X.000] Ft-tól` (vagy írd át „Ár egyeztetés alapján"-ra)
- `[X] nap` átadási idő
- 4 × `[…]` a „Beleértve" listában
- `[garancia, ha lesz]` — opcionális; ha nincs, töröld a teljes „Garancia" blokkot
- **Megmarad mindig:** „Fix ár, fix határidő — meglepetések nélkül." (tényszerű)

---

### Prioritás
1. **Bizonyíték:** 2. Aurum esettanulmány, 5. Eredmények számai
2. **Kínálat-bővítés:** 3. Galéria projektek + 4. Iparág-fülek (ahogy jön a munka)
3. **Üzlet:** 6. Ár + garancia, 1. Hero social proof

> Megjegyzés: a korábbi Vélemény-, Logó-, Szolgáltatás- és „Mit kapsz pontosan?"-szekciók
> törölve lettek a tömörítéskor — már nem szerepelnek a listában.
