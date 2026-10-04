import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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
} from "lucide-react";

export interface StepContainerProps {
  children: React.ReactNode;
  side?: "left" | "right";
  delay?: number;
}

export const AnimatedCard: React.FC<StepContainerProps> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 110 },
  });

  const translateX = interpolate(progress, [0, 1], [-60, 0]);
  const opacity = interpolate(progress, [0, 0.4, 1], [0, 0.7, 1]);
  const scale = interpolate(progress, [0, 1], [0.94, 1]);

  return (
    <div
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity,
      }}
      className="w-[335px]"
    >
      {children}
    </div>
  );
};

// ------------------- PHASE 0 : INTRO ECOSYSTEME (0s - 21s) -------------------
export const IntroContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <AnimatedCard delay={5}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full">
            Écosystème Adék
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-2 mb-1">
            PC & Mobile Synchronisés
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Gérez vos stocks, clients et encaissements sur ordinateur comme sur smartphone en toute fluidité.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                <Monitor size={15} />
              </div>
              <p className="text-xs font-bold text-gray-800">Version PC / Caisse</p>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <Smartphone size={15} />
              </div>
              <p className="text-xs font-bold text-gray-800">Version Mobile Tout-en-un</p>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// ------------------- STEP 1 : SÉLECTION & VENTE MOBILE (21s - 34s) -------------------
export const Step1Content: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <AnimatedCard delay={5}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full">
              Étape 01
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Sur Smartphone</span>
          </div>

          <h2 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-1.5">
            Sélection & Vente <Sparkles className="text-amber-500 inline" size={18} />
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Choisissez vos articles directement sur l'écran tactile : chargeurs, mémoires, souris...
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow">
                <ShoppingBag size={15} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Panier en direct</p>
                <p className="text-[11px] text-gray-600">Calcul automatique du montant total</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Bouton Encaisser</span>
              <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                1 Clic
              </span>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// ------------------- STEP 2 : VENTE À PERTE & À CRÉDIT (34s - 41s) -------------------
export const Step2Content: React.FC = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <AnimatedCard delay={5}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 rounded-full">
              Étape 02
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Modes de Vente</span>
          </div>

          <h2 className="text-lg font-black text-gray-900 mb-1">
            Crédit & Vente à Perte
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Adaptez chaque transaction avec 3 modes intégrés :
          </p>

          <div className="space-y-2">
            {/* Payé */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow">
                ✓
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900">Payé</p>
                <p className="text-[10px] text-emerald-700">Règlement comptant direct</p>
              </div>
            </div>

            {/* À Payer / Crédit */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow">
                <Clock size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-900">À Payer (Crédit)</p>
                <p className="text-[10px] text-amber-700">Suivi dette & compte client</p>
              </div>
            </div>

            {/* Vente à Perte */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-rose-50 border border-rose-200">
              <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow">
                <TrendingDown size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-900">Vente à Perte</p>
                <p className="text-[10px] text-rose-700">Déstockage express autorisé</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// ------------------- STEP 3 : MODIFICATION DE FACTURE (41s - 47s) -------------------
export const Step3Content: React.FC = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <AnimatedCard delay={5}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 rounded-full">
              Étape 03
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Reçus & Factures</span>
          </div>

          <h2 className="text-lg font-black text-gray-900 mb-1">
            Modifier la Facture
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Accédez au reçu et appliquez les ajustements demandés par le client :
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow">
                <FileEdit size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Échanger</p>
                <p className="text-[10px] text-gray-600">Remplacement immédiat d'articles</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-100">
              <div className="p-1.5 rounded-lg bg-rose-600 text-white shadow">
                <Trash2 size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Supprimer</p>
                <p className="text-[10px] text-gray-600">Annulation & retour en stock</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// ------------------- STEP 4 : SYNCHRONISATION (47s - 54s) -------------------
export const Step4Content: React.FC = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <AnimatedCard delay={5}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 rounded-full">
              Étape 04
            </span>
            <span className="text-[11px] text-gray-500 font-medium">Cloud & Données</span>
          </div>

          <h2 className="text-lg font-black text-gray-900 mb-1 flex items-center gap-1.5">
            Synchronisation <RefreshCw className="text-emerald-600 inline" size={18} />
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Mettez à jour vos ventes, cotisations et dépenses en un seul toucher :
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white shadow">
                <Database size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Tout centralisé</p>
                <p className="text-[10px] text-gray-600">Ventes, cotisations, dépenses</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center gap-2 shadow-md">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold">Synchronisation réussie !</span>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};
