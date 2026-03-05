# SP Nettoyages - Site Vitrine

## Projet
- **Client** : SP Nettoyages (Stephane PERRUT)
- **Activite** : Nettoyage professionnel - Particuliers et Professionnels
- **Zone** : Abbevillers, Pays de Montbeliard, Doubs (25)
- **Domaine** : https://sp-nettoyages.fr
- **Project ID CRM** : A_DEFINIR_APRES_CREATION_PROJET_CRM
- **Google Analytics ID** : A configurer apres mise en ligne

## Design
- **Couleur primaire** : #0EA5C8 — Bleu cyan/turquoise (eau pure, fraicheur)
- **Couleur secondaire** : #0C2D48 — Bleu marine profond (confiance, professionnalisme)
- **Couleur accent** : #06D6A0 — Vert menthe/turquoise (ecologie, purete)
- **Couleur dark** : #0A1628 — Bleu nuit (fonds sombres, hero)
- **Couleur light** : #F0F9FF — Bleu glace ultra pale (fonds clairs)
- **Font titres** : Sora (600, 700, 800)
- **Font corps** : DM Sans (400, 500, 600)
- **Ambiance** : Clean et premium avec touche ecologique. Phoenix bleu = renouveau des surfaces nettoyees.

## Pages
- Accueil (Hero split, Stats banner, Services bento grid, Avant/Apres, Pourquoi nous, Avis Google, CTA)
- Services (detail des 6 prestations en alternance)
- Galerie (avant/apres interactifs + galerie masonry filtrable)
- Devis (formulaire multi-etapes intelligent selon le service)
- Contact (formulaire simple + coordonnees)
- Mentions legales
- Politique de confidentialite

## Services du client
1. **Nettoyage a l'eau pure** — Technique ecologique sans trace pour vitres, facades, stores, panneaux solaires
2. **Nettoyage haute pression** — Terrasses, allees, facades, portes de garage
3. **Nettoyage industriel et commercial** — Vitrines, facades, sols (monobrosse), fin de chantier
4. **Entretien regulier** — Contrats sur mesure bureaux, sanitaires, parties communes
5. **Interventions apres sinistre** — Degats des eaux, incendies, decontamination
6. **Nettoyage de vehicules** — Interieur/exterieur, caravanes, camping-cars

## Coordonnees
- **Telephone** : 06 74 33 87 86
- **Email** : spnettoyages04@gmail.com
- **Adresse** : 4 Impasse du Sentier, 25310 Abbevillers
- **Facebook** : https://www.facebook.com/p/SP-Nettoyages-61561349994384/
- **Google Place ID** : (renseigne dans .env.local)
- **Horaires** : Lundi - Vendredi 08:00-19:00

## Infos legales
- **Raison sociale** : PERRUT STEPHANE (EI)
- **Nom commercial** : SP Nettoyages
- **SIRET** : 984 048 389 00014
- **TVA** : FR37984048389
- **Forme juridique** : Entrepreneur individuel (Micro-entreprise)
- **Directeur de publication** : Stephane PERRUT

## Specificites projet
- Slider avant/apres interactif (10 paires disponibles)
- Galerie filtrable par categorie de service
- Formulaire devis multi-etapes avec champs conditionnels selon le service
- Theme eau/proprete avec effets visuels (bulles, gouttelettes, ondulations)
- Section stats animee (17+ ans, 26 avis, 5/5, 0 produit chimique)
- Avis Google reels via API Google Places

## Variables d'environnement
Les cles agence (Resend, Google Places API) sont dans `.env.agence` et copiees automatiquement.
Seules les variables specifiques au projet sont a renseigner ici :
```
NEXT_PUBLIC_GOOGLE_PLACE_ID=(renseigne dans .env.local)
NEXT_PUBLIC_GA_ID=(a configurer apres mise en ligne)
```
