'use client';

import { motion } from 'framer-motion';
import { LessonCategory } from '@/lib/models';
import { ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: LessonCategory;
  icon?: string;
  color?: string;
  articleCount: number;
  description?: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
  onSelectCategory?: (category: LessonCategory) => void;
  selectedCategory?: LessonCategory;
}

const getCategoryColor = (name: LessonCategory): string => {
  const colors: Record<LessonCategory, string> = {
    'Faith & Growth': 'from-amber-500/20 to-orange-500/10',
    'Prayer & Devotion': 'from-purple-500/20 to-pink-500/10',
    'Relationships': 'from-rose-500/20 to-pink-500/10',
    'Youth Teachings': 'from-blue-500/20 to-cyan-500/10',
    'Spiritual Warfare': 'from-red-500/20 to-orange-500/10',
    'Wisdom & Discipline': 'from-emerald-500/20 to-teal-500/10',
    'Leadership': 'from-indigo-500/20 to-blue-500/10',
    'Purpose & Calling': 'from-violet-500/20 to-purple-500/10',
    'Healing & Encouragement': 'from-green-500/20 to-emerald-500/10',
    'Worship': 'from-yellow-500/20 to-amber-500/10',
    'Identity in Elohim': 'from-gold/20 to-amber-500/10',
    'Mental Strength': 'from-cyan-500/20 to-blue-500/10',
    'Daily Inspiration': 'from-amber-500/20 to-yellow-500/10',
    'Character Development': 'from-slate-500/20 to-gray-500/10',
    'Biblical Lifestyle': 'from-green-500/20 to-teal-500/10',
    'Spiritual Maturity': 'from-purple-500/20 to-indigo-500/10',
    'Torah & Wisdom': 'from-gold/20 to-orange-500/10',
    'End Times & Prophecy': 'from-red-500/20 to-rose-500/10',
    'Family & Marriage': 'from-pink-500/20 to-rose-500/10',
    'Calling & Ministry': 'from-violet-500/20 to-purple-500/10',
    'Overcoming Temptation': 'from-orange-500/20 to-red-500/10',
    'Discipleship': 'from-blue-500/20 to-indigo-500/10',
    'Biblical Leadership': 'from-slate-500/20 to-blue-500/10',
    'Messianic Teachings': 'from-gold/20 to-yellow-500/10',
  };
  return colors[name] || 'from-slate-500/20 to-gray-500/10';
};

const getCategoryIcon = (name: LessonCategory): string => {
  const icons: Record<LessonCategory, string> = {
    'Faith & Growth': '🌱',
    'Prayer & Devotion': '🙏',
    'Relationships': '💞',
    'Youth Teachings': '👶',
    'Spiritual Warfare': '⚔️',
    'Wisdom & Discipline': '📖',
    'Leadership': '👑',
    'Purpose & Calling': '🎯',
    'Healing & Encouragement': '💚',
    'Worship': '🎵',
    'Identity in Elohim': '🕯️',
    'Mental Strength': '💪',
    'Daily Inspiration': '✨',
    'Character Development': '🏔️',
    'Biblical Lifestyle': '🌿',
    'Spiritual Maturity': '🌳',
    'Torah & Wisdom': '📜',
    'End Times & Prophecy': '⏰',
    'Family & Marriage': '👨‍👩‍👧‍👦',
    'Calling & Ministry': '📣',
    'Overcoming Temptation': '🛡️',
    'Discipleship': '🎓',
    'Biblical Leadership': '🔱',
    'Messianic Teachings': '🕊️',
  };
  return icons[name] || '📚';
};

export function CategoryGrid({ categories, onSelectCategory, selectedCategory }: CategoryGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          variants={itemVariants}
          whileHover={{ y: -4 }}
          onClick={() => onSelectCategory?.(category.name)}
          className={`group relative overflow-hidden rounded-[24px] border transition duration-300 p-6 text-left ${
            selectedCategory === category.name
              ? 'border-gold/50 bg-gold/10'
              : 'border-white/10 hover:border-gold/30 bg-gradient-to-br'
          } ${getCategoryColor(category.name)} shadow-soft hover:shadow-glow`}
        >
          {/* Icon */}
          <div className="mb-4 text-4xl">{getCategoryIcon(category.name)}</div>

          {/* Name */}
          <h3 className="mb-2 font-semibold text-white group-hover:text-gold transition">
            {category.name}
          </h3>

          {/* Article count */}
          <p className="text-sm text-slate-400">
            {category.articleCount} {category.articleCount === 1 ? 'teaching' : 'teachings'}
          </p>

          {/* Description */}
          {category.description && (
            <p className="mt-3 text-xs text-slate-500 line-clamp-2">{category.description}</p>
          )}

          {/* Arrow indicator */}
          <div className="absolute bottom-4 right-4 rounded-full bg-white/10 p-2 opacity-0 transition group-hover:opacity-100">
            <ChevronRight className="h-4 w-4 text-white" />
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
