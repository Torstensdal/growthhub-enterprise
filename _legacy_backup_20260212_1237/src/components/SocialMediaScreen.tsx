import { useState } from 'react';
import type { SocialPost, Story } from '../types';

export default function SocialMediaScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'stories'>('posts');
  const [posts] = useState<SocialPost[]>([]);
  const [stories] = useState<Story[]>([]);

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      linkedin: '💼',
      twitter: '🐦',
      facebook: '📘',
      instagram: '📸',
    };
    return icons[platform] || '📱';
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      linkedin: 'bg-blue-600',
      twitter: 'bg-sky-500',
      facebook: 'bg-blue-700',
      instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    };
    return colors[platform] || 'bg-gray-600';
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return badges[status] || badges.draft;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-medium rounded-lg ${
              activeTab === 'posts' ? 'bg-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            📱 Posts
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-3 font-medium rounded-lg ${
              activeTab === 'stories' ? 'bg-purple-600 text-white' : 'text-gray-600'
            }`}
          >
            ⭐ Stories
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'posts' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-6xl mb-4">📱</p>
                <p className="text-xl text-gray-600">Ingen posts endnu</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-white text-sm ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)} {post.platform}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-800 line-clamp-4">{post.content}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stories.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-6xl mb-4">⭐</p>
                <p className="text-xl text-gray-600">Ingen stories endnu</p>
              </div>
            ) : (
              stories.map(story => (
                <div key={story.id} className="aspect-[9/16] bg-gradient-to-b from-purple-400 to-blue-400 rounded-lg">
                  <div className="p-4">
                    <span className={`px-2 py-1 rounded text-white text-xs ${getPlatformColor(story.platform)}`}>
                      {getPlatformIcon(story.platform)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
