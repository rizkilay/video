import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Sparkles,
  DollarSign,
  UserCheck,
  RotateCcw,
  CloudLightning,
  Shield,
  Smartphone,
  Check,
} from "lucide-react";
import { AnimatedCard } from "./StepCards";

export const RightCallout1: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-[380px]">
      <AnimatedCard side="right" delay={15}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={16} /> Panier Intelligent
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            Multi-articles en 1 clic
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            L'utilisateur sélectionne plusieurs articles : Chargeurs, souris Logitech, cartes SD... Le total passe automatiquement à <strong className="text-blue-600">13 000 FCFA</strong>.
          </p>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="text-xs font-semibold">Bouton Encaisser</span>
            <span className="text-xs font-black bg-emerald-600 text-white px-2.5 py-1 rounded-lg">
              Prêt
            </span>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export const RightCallout2: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-[380px]">
      <AnimatedCard side="right" delay={10}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <DollarSign size={16} /> Flexibilité Totale
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            Vente à Perte & Crédit
          </h3>
          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <span className="font-bold">À payer (Crédit) :</span> Conserve l'historique de paiement et associe la créance au client.
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
              <span className="font-bold">Vente à perte :</span> Permet d'autoriser une vente en-dessous du coût d'achat en cas de fin de série.
            </div>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard side="right" delay={25}>
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <UserCheck size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Nom du client</p>
            <p className="text-[11px] text-gray-500">Sélection du contact pour le suivi</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export const RightCallout3: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-[380px]">
      <AnimatedCard side="right" delay={10}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-3 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <RotateCcw size={16} /> Ajustements Vente
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            Facture Modifiable
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Une erreur sur la commande ou un retour client ? Deux options rapides s'offrent au vendeur directement sur le reçu :
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-xs font-bold text-blue-900">1. Échanger</span>
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-md font-semibold">
                Remplacement
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
              <span className="text-xs font-bold text-rose-900">2. Supprimer</span>
              <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-semibold">
                Annulation
              </span>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export const RightCallout4: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 6) * 0.08 + 1;

  return (
    <div className="flex flex-col gap-4 w-[380px]">
      <AnimatedCard side="right" delay={10}>
        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/80">
          <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <CloudLightning size={16} /> Cloud Sync
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">
            Synchronisation Totale
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Un simple clic sur <strong>Synchroniser</strong> envoie instantanément toutes les opérations de la caisse sur le cloud.
          </p>

          <div
            style={{ transform: `scale(${pulse})` }}
            className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-lg flex items-center justify-center gap-2 font-bold text-xs"
          >
            <Check size={16} />
            <span>Synchronisation Réussie !</span>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard side="right" delay={25}>
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/80 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Données Sécurisées</p>
            <p className="text-[11px] text-gray-500">Sauvegarde chiffrée & accessible partout</p>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

// Branded overlay badge covering the watermark cleanly
export const WatermarkCover: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "1173px",
        top: "427px",
        width: "54px",
        height: "228px",
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        zIndex: 25,
      }}
      className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 via-indigo-600 to-indigo-700 text-white py-4 shadow-xl border-y border-r border-blue-300/40 select-none overflow-hidden"
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mb-3">
        <Smartphone size={13} className="text-white" />
      </div>
      <span
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        className="text-[12px] font-black tracking-widest uppercase text-white/95"
      >
        ADÉK
      </span>
      <span
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        className="text-[9px] font-bold tracking-wider uppercase text-blue-200 mt-2"
      >
        POS
      </span>
    </div>
  );
};
