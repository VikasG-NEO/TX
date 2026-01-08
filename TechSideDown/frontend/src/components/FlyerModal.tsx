import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import flyerImg from '@/assets/flyer.jpg';

interface FlyerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FlyerModal = ({ isOpen, onClose }: FlyerModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-4xl bg-zinc-900 border border-red-500/30 rounded-lg p-2 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative overflow-hidden rounded-md group cursor-pointer" onClick={() => window.open(flyerImg, '_blank')}>
                            <img
                                src={flyerImg}
                                alt="Hackathon Flyer"
                                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <span className="text-white font-display tracking-wider">Click to Zoom</span>
                            </div>
                        </div>

                        <div className="text-center py-4 bg-gradient-to-t from-red-950/50 to-transparent">
                            <h3 className="text-2xl md:text-3xl font-stranger text-red-500 animate-pulse tracking-wider">
                                Hackathon 1st Round Is Free
                            </h3>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FlyerModal;
