export default function StageCard({ stage, isActive, progress, onClick }) {
  const total = stage.checklist.length
  const done = progress
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const isComplete = pct === 100

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 6px',
        borderRadius: '12px',
        border: `2px solid ${isActive ? stage.color : isComplete ? stage.borderColor : '#E2E8F0'}`,
        background: isActive ? stage.lightColor : isComplete ? stage.lightColor + '80' : '#FFFFFF',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.2s ease',
        boxShadow: isActive
          ? `0 4px 14px ${stage.color}30`
          : '0 1px 3px rgba(0,0,0,0.06)',
        transform: isActive ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: isComplete ? stage.color : isActive ? stage.color + '20' : '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}
      >
        {isComplete ? (
          <span style={{ color: '#fff', fontSize: '16px' }}>✓</span>
        ) : (
          stage.icon
        )}
      </div>

      <div style={{ textAlign: 'center', width: '100%' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: isActive ? stage.color : '#334155',
            marginBottom: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {stage.name}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: isComplete ? stage.color : '#94A3B8',
            fontWeight: '600',
          }}
        >
          {done}/{total}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '3px',
          background: '#E2E8F0',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: stage.color,
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </button>
  )
}
