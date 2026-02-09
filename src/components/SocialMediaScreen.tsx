import { useState } from 'react';
import type { SocialPost, Story } from '../types';
import apiClient from '../services/apiClient';

export default function SocialMediaScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'stories'>('posts');
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [newPost, setNewPost] = useState<Partial<SocialPost>>({
    platform: 'linkedin',
    content: '',
    status: 'draft',
  });
  const [newStory, setNewStory] = useState<Partial<Story>>({
    platform: 'instagram',
    type: 'image',
    status: 'draft',
  });

  const handleCreatePost = async () => {
    if (!newPost.content) {
      alert('Indhold er påkrævet');
      return;
    }

    const response = await apiClient.createSocialPost({
      platform: newPost.platform || 'linkedin',
      content: newPost.content,
      hashtags: newPost.hashtags || [],
      status: 'draft',
    } as Omit<SocialPost, 'id'>);

    if (response.success && response.data) {
      setPosts([...posts, response.data]);
      setNewPost({ platform: 'linkedin', content: '', status: 'draft' });
      setIsCreatingPost(false);
    } else {
      alert('Kunne ikke oprette post: ' + response.error);
    }
  };

  const handleGeneratePost = async () => {
    const prompt = newPost.content || 'Opret et engagerende LinkedIn post om vores services';
    const response = await apiClient.generateSocialPost(prompt, newPost.platform || 'linkedin');

    if (response.success && response.data) {
      setNewPost({ ...newPost, content: response.data.content });
    } else {
      alert('Kunne ikke generere post: ' + response.error);
    }
  };

  const handleCreateStory = async () => {
    if (!newStory.media) {
      alert('Medie er påkrævet');
      return;
    }

    const response = await apiClient.createStory({
      platform: newStory.platform || 'instagram',
      media: newStory.media,
      type: newStory.type || 'image',
      text: newStory.text,
      status: 'draft',
    } as Omit<Story, 'id'>);

    if (response.success && response.data) {
      setStories([...stories, response.data]);
      setNewStory({ platform: 'instagram', type: 'image', status: 'draft' });
      setIsCreatingStory(false);
    } else {
      alert('Kunne ikke oprette story: ' + response.error);
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      linkedin: '💼',
      twitter: '🐦',
      facebook: '📘',
      instagram: '📸',
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      linkedin: 'bg-blue-600',
      twitter: 'bg-sky-500',
      facebook: 'bg-blue-700',
      instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-600';
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: 'bg-gray-100 text-gray-800',
      scheduled: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-medium rounded-lg transition-all ${
                activeTab === 'posts'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📱 Posts
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-3 font-medium rounded-lg transition-all ${
                activeTab === 'stories'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ⭐ Stories
            </button>
          </div>
          <button
            onClick={() => activeTab === 'posts' ? setIsCreatingPost(true) : setIsCreatingStory(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
          >
            + Opret {activeTab === 'posts' ? 'Post' : 'Story'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'posts' ? (
          <div>
            {isCreatingPost ? (
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Opret Nyt Post</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <div className="grid grid-cols-4 gap-3">
                      {['linkedin', 'twitter', 'facebook', 'instagram'].map((platform) => (
                        <button
                          key={platform}
                          onClick={() => setNewPost({ ...newPost, platform: platform as SocialPost['platform'] })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            newPost.platform === platform
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{getPlatformIcon(platform)}</div>
                          <div className="text-sm font-medium capitalize">{platform}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Indhold</label>
                    <textarea
                      value={newPost.content || ''}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Skriv dit post indhold her..."
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        {newPost.content?.length || 0} tegn
                      </span>
                      <button
                        onClick={handleGeneratePost}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        ✨ Generer med AI
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                    <input
                      type="text"
                      value={newPost.hashtags?.join(' ') || ''}
                      onChange={(e) => setNewPost({ 
                        ...newPost, 
                        hashtags: e.target.value.split(' ').filter(h => h.startsWith('#'))
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="#marketing #socialmedia #growthhub"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCreatePost}
                      className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Gem som Kladde
                    </button>
                    <button
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      📅 Planlæg
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingPost(false);
                        setNewPost({ platform: 'linkedin', content: '', status: 'draft' });
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Annuller
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <p className="text-6xl mb-4">📱</p>
                    <p className="text-xl text-gray-600 mb-2">Ingen posts endnu</p>
                    <p className="text-gray-500 mb-4">Opret dit første social media post</p>
                    <button
                      onClick={() => setIsCreatingPost(true)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      + Opret Post
                    </button>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getPlatformColor(post.platform)}`}>
                          {getPlatformIcon(post.platform)} {post.platform}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(post.status)}`}>
                          {post.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-800 mb-4 line-clamp-4">{post.content}</p>
                      
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag, idx) => (
                            <span key={idx} className="text-sm text-blue-600">{tag}</span>
                          ))}
                        </div>
                      )}
                      
                      {post.analytics && (
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Likes</p>
                            <p className="font-bold text-gray-900">{post.analytics.likes}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Comments</p>
                            <p className="font-bold text-gray-900">{post.analytics.comments}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Shares</p>
                            <p className="font-bold text-gray-900">{post.analytics.shares}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {isCreatingStory ? (
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">Opret Ny Story</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setNewStory({ ...newStory, platform: 'instagram' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          newStory.platform === 'instagram'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-1">📸</div>
                        <div className="text-sm font-medium">Instagram</div>
                      </button>
                      <button
                        onClick={() => setNewStory({ ...newStory, platform: 'facebook' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          newStory.platform === 'facebook'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-1">📘</div>
                        <div className="text-sm font-medium">Facebook</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setNewStory({ ...newStory, type: 'image' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          newStory.type === 'image'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">🖼️</div>
                        <div className="text-sm font-medium">Billede</div>
                      </button>
                      <button
                        onClick={() => setNewStory({ ...newStory, type: 'video' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          newStory.type === 'video'
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">🎥</div>
                        <div className="text-sm font-medium">Video</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Medie</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                      <p className="text-4xl mb-2">📤</p>
                      <p className="text-sm text-gray-600">Klik for at uploade eller træk fil herhen</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {newStory.type === 'image' ? 'PNG, JPG op til 10MB' : 'MP4, MOV op til 100MB'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tekst (valgfrit)</label>
                    <input
                      type="text"
                      value={newStory.text || ''}
                      onChange={(e) => setNewStory({ ...newStory, text: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tilføj tekst til din story..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCreateStory}
                      className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Gem Story
                    </button>
                    <button
                      onClick={() => {
                        setIsCreatingStory(false);
                        setNewStory({ platform: 'instagram', type: 'image', status: 'draft' });
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Annuller
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stories.length === 0 ? (
                  <div className="col-span-full text-center py-16">
                    <p className="text-6xl mb-4">⭐</p>
                    <p className="text-xl text-gray-600 mb-2">Ingen stories endnu</p>
                    <p className="text-gray-500 mb-4">Opret din første story</p>
                    <button
                      onClick={() => setIsCreatingStory(true)}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      + Opret Story
                    </button>
                  </div>
                ) : (
                  stories.map((story) => (
                    <div key={story.id} className="relative aspect-[9/16] bg-gradient-to-b from-purple-400 to-blue-400 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getPlatformColor(story.platform)}`}>
                          {getPlatformIcon(story.platform)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(story.status)}`}>
                          {story.status}
                        </span>
                      </div>
                      {story.text && (
                        <div className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm">
                          {story.text}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
