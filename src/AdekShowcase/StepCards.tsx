import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ShoppingBag,
  Sparkles,
  TrendingDown,
  Clock,
  FileEdit,
  Trash2,
  RefreshCw,
  Database,
  CheckCircle2,
  Monitor,
  Smartphone,
  Sliders,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface StepCardWrapperProps {
  children: React.ReactNode;
  durationInFrames: number;
  position?: "pc-bottom" | "mobile-top";
}

export const AnimatedStepWrapper: React.FC<StepCardWrapperProps> = ({
  children,
  durationInFrames,
  position = "pc-bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  // Exit transition during last 15 frames
  const exitFrames = 15;
  const exitStart = Math.max(0, durationInFrames - exitFrames);
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateYEntrance = interpolate(
    entrance,
    [0, 1],
    [position === "pc-bottom" ? 40 : -40, 0]
  );
  const translateYExit = interpolate(
    exitProgress,
    [0, 1],
    [0, position === "pc-bottom" ? 25 : -25]
  );
  const translateY = translateYEntrance + translateYExit;

  const scaleEntrance = interpolate(entrance, [0, 1], [0.95, 1]);
  const scaleExit = interpolate(exitProgress, [0, 1], [1, 0.96]);
  const scale = scaleEntrance * scaleExit;

  const opacityEntrance = interpolate(entrance, [0, 1], [0, 1]);
  const opacityExit = interpolate(exitProgress, [0, 1], [1, 0]);
  const opacity = opacityEntrance * opacityExit;

  const positionClass =
    position === "pc-bottom"
      ? "absolute top-[870px] left-[60px] w-[960px]"
      : "absolute top-[90px] left-[60px] w-[960px]";

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
      className={`${positionClass} z-30 pointer-events-none select-none`}
    >
      <div className="bg-white/92 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] border border-white/90">
        {children}
      </div>
    </div>
  );
};

// Compatibility export
export const AnimatedCard: React.FC<{ children: React.ReactNode; side?: string; delay?: number }> = ({ children }) => {
  return <div>{children}</div>;
};

// =========================================================================
// PC DEMO STEPS (Frames 0 to 630)
// =========================================================================

// PC Step 1: Sélection des produits (0 - 140 frames)
export const PCStep1Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 rounded-full border border-blue-200">
            Version PC • Étape 01
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Monitor size={14} className="text-blue-600" /> Caisse Comptoir
          </span>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <Sparkles size={13} /> Ajout Instantané
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Sélection des Produits & Panier en direct
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Sur ordinateur, cliquez sur vos articles (tactile ou souris) ou scannez au code-barres. Le panier s'alimente en temps réel avec le calcul automatique du montant total.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <ShoppingBag size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Panier dynamique</p>
            <p className="text-xs text-gray-500">Type-c, V8, Iphone ajoutés</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30">
            <Check size={18} className="stroke-[3]" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-950">Total automatique</p>
            <p className="text-xs text-emerald-700 font-semibold">Montant initial : 6 000 FCFA</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// PC Step 2: Détails du reçu & Réduction prix/quantité (140 - 270 frames)
export const PCStep2Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 rounded-full border border-indigo-200">
            Version PC • Étape 02
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Sliders size={14} className="text-indigo-600" /> Négociation & Remises
          </span>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Bouton Détails
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Détails du Reçu : Réduire le Prix ou la Quantité
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Ouvrez la fenêtre <strong className="text-indigo-700 font-bold">Détails du reçu</strong> pour ajuster directement le prix unitaire d'un article ou modifier la quantité vendue selon la négociation client.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
          <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <Sliders size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Prix unitaire flexible</p>
            <p className="text-xs text-gray-500">Modification du prix à la volée</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200">
          <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/30">
            <FileEdit size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-purple-950">Ajustement quantités</p>
            <p className="text-xs text-purple-700 font-semibold">Recalcul instantané du total</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// PC Step 3: Marquer comme perte ou Vente à crédit (270 - 340 frames)
export const PCStep3Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 rounded-full border border-amber-200">
            Version PC • Étape 03
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Clock size={14} className="text-amber-600" /> Modes Spéciaux
          </span>
        </div>
        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Flexibilité Totale
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Marquer comme Perte ou Vendre à Crédit
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Activez l'interrupteur <strong className="text-rose-700">Marquer comme perte</strong> pour déstocker les articles endommagés, ou saisissez le <strong className="text-amber-700">Montant payé</strong> pour enregistrer une vente à crédit liée au client.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-950">Vente à Crédit</p>
            <p className="text-xs text-amber-800">Montant payé & solde restant dû</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-500/30">
            <TrendingDown size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-950">Marquer comme Perte</p>
            <p className="text-xs text-rose-800">Sortie d'inventaire sans blocage</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// PC Step 4: Validation & Bilan Factures (340 - 630 frames)
export const PCStep4Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="pc-bottom">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 rounded-full border border-emerald-200">
            Version PC • Étape 04
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <CheckCircle2 size={14} className="text-emerald-600" /> Enregistrement
          </span>
        </div>
        <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <Check size={14} className="stroke-[3]" /> Vente Validée
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Validation en 1 Clic & Suivi des Factures
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        En cliquant sur <strong className="text-emerald-700">Valider</strong>, le reçu est immédiatement enregistré. Le système classe vos transactions en <strong className="text-emerald-700">Factures payées</strong>, <strong className="text-amber-700">Factures impayées</strong> et <strong className="text-rose-700">Pertes de produits</strong>.
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-xs font-black text-emerald-900 block mb-0.5">Payées</span>
          <span className="text-[11px] text-emerald-700 font-medium">Encaissement complet</span>
        </div>
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-xs font-black text-amber-900 block mb-0.5">Impayées</span>
          <span className="text-[11px] text-amber-700 font-medium">Créances clients</span>
        </div>
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center">
          <span className="text-xs font-black text-rose-900 block mb-0.5">Pertes</span>
          <span className="text-[11px] text-rose-700 font-medium">Pertes & avaries</span>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// =========================================================================
// MOBILE DEMO STEPS (Frames 630 to 1590) - Displayed PROMINENTLY ABOVE PHONE
// =========================================================================

// Mobile Step 1: Sélection & Vente Mobile (630 - 835 frames)
export const MobileStep1Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 rounded-full border border-blue-200">
            Version Mobile • Étape 01
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Smartphone size={14} className="text-blue-600" /> Écran Tactile
          </span>
        </div>
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
          <Sparkles size={13} /> Rapide & Fluide
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Sélection Tactile & Panier Express
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Touchez le bouton <strong className="text-blue-600">Vendre</strong> pour ouvrir la caisse mobile. Choisissez vos articles du bout des doigts, puis validez avec <strong className="text-emerald-600">Encaisser</strong>.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/80 border border-blue-100">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <ShoppingBag size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">4 articles sélectionnés</p>
            <p className="text-[11px] text-gray-500">Chargeurs, souris, téléphones</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200">
          <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30">
            <ArrowRight size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-950">Bouton Encaisser</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Total : 13 000 FCFA</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// Mobile Step 2: Crédit & Perte Mobile (835 - 1035 frames)
export const MobileStep2Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 rounded-full border border-amber-200">
            Version Mobile • Étape 02
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <Clock size={14} className="text-amber-600" /> Modes de Vente
          </span>
        </div>
        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          3 Modes Intégrés
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Vente au Comptant, à Crédit & à Perte
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Choisissez instantanément l'option adaptée sur le mobile : règlement immédiat (<strong className="text-emerald-600">Payé</strong>), dette client (<strong className="text-amber-600">À payer</strong>) ou déstockage (<strong className="text-rose-600">Perte</strong>).
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-xs font-black text-emerald-950 block">✓ Payé</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Règlement comptant</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-xs font-black text-amber-950 block">⏳ À Payer</span>
          <span className="text-[10px] text-amber-700 font-semibold">Crédit client suivi</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
          <span className="text-xs font-black text-rose-950 block">📉 Perte</span>
          <span className="text-[10px] text-rose-700 font-semibold">Sortie autorisée</span>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// Mobile Step 3: Factures & Modification (1035 - 1275 frames)
export const MobileStep3Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 rounded-full border border-purple-200">
            Version Mobile • Étape 03
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <FileEdit size={14} className="text-purple-600" /> Reçus Clients
          </span>
        </div>
        <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Facture Modifiable
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Modifier la Facture : Échanger ou Supprimer
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Un retour ou changement d'avis client ? Dans l'onglet <strong className="text-purple-700">Reçus</strong>, ouvrez la facture pour échanger un article ou supprimer une ligne avec retour immédiat en stock.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <FileEdit size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Bouton Échanger</p>
            <p className="text-[11px] text-gray-500">Remplacement direct d'article</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50 border border-rose-100">
          <div className="p-2 rounded-xl bg-rose-600 text-white shadow-md shadow-rose-500/30">
            <Trash2 size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Bouton Supprimer</p>
            <p className="text-[11px] text-rose-700 font-semibold">Annulation & retour en stock</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};

// Mobile Step 4: Synchronisation Cloud (1275 - 1590 frames)
export const MobileStep4Content: React.FC<{ duration: number }> = ({ duration }) => {
  return (
    <AnimatedStepWrapper durationInFrames={duration} position="mobile-top">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-teal-900 bg-teal-100 rounded-full border border-teal-200">
            Version Mobile • Étape 04
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
            <RefreshCw size={14} className="text-teal-600 animate-spin" /> Cloud & Données
          </span>
        </div>
        <span className="text-xs font-black text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 flex items-center gap-1">
          <ShieldCheck size={14} /> Synchro Sécurisée
        </span>
      </div>

      <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
        Synchronisation Cloud en 1 Seul Clic
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        Dans le menu <strong className="text-teal-700">Profil</strong>, touchez 'Synchroniser'. Vos ventes, cotisations et dépenses sont instantanément synchronisées entre votre smartphone et votre PC.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-teal-50 border border-teal-100">
          <div className="p-2 rounded-xl bg-teal-600 text-white shadow-md shadow-teal-500/30">
            <Database size={17} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Toutes données unifiées</p>
            <p className="text-[11px] text-gray-500">Ventes, cotisations & dépenses</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md">
          <div className="p-2 rounded-xl bg-white/20">
            <CheckCircle2 size={17} />
          </div>
          <div>
            <p className="text-xs font-black">Synchronisation Réussie</p>
            <p className="text-[11px] text-emerald-100">Données à jour en temps réel</p>
          </div>
        </div>
      </div>
    </AnimatedStepWrapper>
  );
};
